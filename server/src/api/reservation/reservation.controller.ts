import { AmenityDocument } from '../amenity/amenity.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import {
    CancelReservation,
    CreateReservation,
    GetReservation,
    PayReservation,
    PaymentStatus,
    ReservationAmenity,
    ReservationDocument,
    ReservationPopulatedDocument,
    ReservationQuery,
    ReservationStatus,
    ReservationUser,
    ReservationUserParam
} from './reservation.types';
import { CheckData } from '../../utilities/checkData';
import { Conflict, NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { archieveLink, createLink, Link } from '../../utilities/paymongo';
import { EventsPlaceDocument } from '../eventsPlace/eventsPlace.types';
import { id } from '../../utilities/ids';
import { logCreateReservation, logUpdateReservationStatus } from '../log/log.controller';
import AmenityModel from '../amenity/amenity.model';
import EventsPlaceModel from '../eventsPlace/eventsPlace.model';
import ReservationModel from './reservation.model';

export const getReservations: RequestHandler = async (req: QueryRequest<GetReservation>, res) => {
    const { user, query, params } = req;
    const { reservationId, eventsPlaceId } = query;
    const { reservationUser } = params as ReservationUserParam;

    if (!user) throw new Unauthorized();

    const checker = new CheckData();
    checker.checkType(reservationId, 'string', 'reservationId', true);
    checker.checkType(eventsPlaceId, 'string', 'eventsPlaceId', true);
    if (Object.values(ReservationUser).indexOf(reservationUser) === -1) {
        checker.addError('reservationUser', 'Invalid accessor');
    }
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const reservationQuery: ReservationQuery = {};

    switch (reservationUser) {
        case ReservationUser.HOST:
            reservationQuery.host = user._id;
            break;
        case ReservationUser.RENTER:
            reservationQuery.renter = user._id;
            break;
    }

    if (eventsPlaceId) {
        // Find events place
        const eventsPlace = await EventsPlaceModel.exists({ eventsPlaceId }).exec();
        if (!eventsPlace) throw new NotFound('Events Place');

        reservationQuery.eventsPlace = eventsPlace._id;
    }

    if (reservationId) {
        reservationQuery.reservationId = reservationId;
    }

    // Find reservations
    const reservations: ReservationPopulatedDocument[] = await ReservationModel.find(reservationQuery)
        .populate('renter host eventsPlace')
        .exec();

    res.json(reservations);
};

const minutesToMillis = 60000;
const daysToMillis = 86400000;
export const createReservation: RequestHandler = async (req: BodyRequest<CreateReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { eventsPlaceId, amenities, startDate, days, guestCount } = body;
    const checker = new CheckData();

    checker.checkType(eventsPlaceId, 'string', 'eventsPlaceId');
    checker.checkType(startDate, 'number', 'startDate');
    checker.checkType(days, 'number', 'days');

    if (amenities instanceof Array) {
        for (let i = 0; i < amenities.length; i++) {
            const { amenityId, quantity } = amenities[i];
            checker.checkType(amenityId, 'string', `amenities.${i}.amenityId`);
            checker.checkType(quantity, 'number', `amenities.${i}.quantity`);
        }
    } else if (amenities != null) {
        checker.addError('amenities', `amenities is ${typeof amenities}`);
    }

    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Find the events place event id
    const eventsPlace: EventsPlaceDocument | null = await EventsPlaceModel.findOne({ eventsPlaceId }).exec();
    if (!eventsPlace) throw new NotFound('Events Place');

    const amenitySearches = amenities.map(
        (amenity) =>
            new Promise(async (resolve: (value: ReservationAmenity | null) => void) => {
                // Find the amenity
                const amenityDoc: AmenityDocument | null = await AmenityModel.findOne({
                    amenityId: amenity.amenityId,
                    eventsPlace: eventsPlace._id
                }).exec();

                // Check if the amenity is owned by the events place
                if (!amenityDoc) {
                    resolve(null);
                    return;
                }

                // If found, return the amenity
                resolve({
                    ...amenity,
                    rate: amenityDoc.rate
                });
            })
    );

    // Perform search
    let availableAmenities = await Promise.all(amenitySearches);
    // Filter out null amenities
    availableAmenities = availableAmenities.filter((amenity) => amenity != null);

    const start = new Date(startDate);
    const end = new Date(start.getTime() + days * daysToMillis);

    const dateQueryRange = { $gt: start, $lt: end };

    // Find reservation within the given date
    const existing: ReservationDocument[] = await ReservationModel.find({
        eventsPlace: eventsPlace._id,
        'status.reservation': ReservationStatus.RESERVED,
        $or: [{ 'duration.start': dateQueryRange }, { 'duration.end': dateQueryRange }]
    });

    if (existing.length > 0) throw new Conflict('Existing reservation found');

    let reservationId = id(2);

    // Create reservation
    const reservation = await ReservationModel.create({
        reservationId: reservationId,
        renter: user._id,
        host: eventsPlace.host,
        eventsPlace: eventsPlace._id,
        amenities: availableAmenities,
        duration: { start, end },
        guestCount: guestCount,
        status: {
            payment: PaymentStatus.UNPAID,
            reservation: ReservationStatus.PENDING
        }
    });

    // await logCreateReservation(user.userId, eventsPlace.eventsPlaceId, reservation.reservationId);

    setTimeout(async () => {
        const updatedReservation = await ReservationModel.findById(reservation._id);
        if (!updatedReservation) {
            return;
        }

        const { payment: paymentStatus, reservation: reservationStatus } = updatedReservation.status;

        // Check if reservation is still unpaid
        if (paymentStatus === PaymentStatus.UNPAID && reservationStatus === ReservationStatus.PENDING) {
            // If so, set the reservation status to failed
            reservation.status.reservation = ReservationStatus.FAILED;
            await reservation.save();
            await logUpdateReservationStatus(
                reservation.reservationId,
                ReservationStatus.PENDING,
                ReservationStatus.FAILED
            );

            // Archieve paymongo link, if any
            if (updatedReservation.payment) {
                await archieveLink(updatedReservation.payment.id);
            }
        }
    }, 10 * minutesToMillis); // 1 day

    res.json({ reservationId });

};

export const payReservation: RequestHandler = async (req: BodyRequest<PayReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { reservationId, amount } = body;
    const checker = new CheckData();

    checker.checkType(reservationId, 'string', 'reservationId');
    checker.checkType(amount, 'number', 'amount');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Find reservation
    const reservation: ReservationDocument | null = await ReservationModel.findOne({
        reservationId,
        renter: user._id,
        'status.payment': PaymentStatus.UNPAID
    }).exec();
    if (!reservation) throw new NotFound('Reservation');

    // Create payment link
    const link = await createLink(amount, `Payment for reservation ${reservationId}`);

    reservation.payment = link;
    await reservation.save();

    res.send({ link: link.attributes.checkout_url });
};

export const cancelReservation: RequestHandler = async (req: BodyRequest<CancelReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { reservationId } = body;
    const checker = new CheckData();

    checker.checkType(reservationId, 'string', 'reservationId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Find reservation
    const reservation: ReservationDocument | null = await ReservationModel.findOne({
        reservationId,
        renter: user._id
    }).exec();
    if (!reservation) throw new NotFound('Reservation');

    const oldStatus = reservation.status.reservation;

    reservation.status.reservation = ReservationStatus.CANCELED;
    await reservation.save();

    await logUpdateReservationStatus(reservation.reservationId, oldStatus, ReservationStatus.CANCELED);

    // Archieve paymongo link, if any
    if (reservation.payment) {
        await archieveLink(reservation.payment.id);
    }

    res.sendStatus(204);
};

export const getReservationDates: RequestHandler = async (req, res) => {
    const currentDate: Date = new Date();
    const reservations: ReservationDocument[] = await ReservationModel.find({ 'duration.start': { $gt: currentDate } });
    const reservedDates: number[] = [];

    for (const reservation of reservations) {
        let activeDate = reservation.duration.start;
        const endDate = reservation.duration.end;

        while (activeDate < endDate) {
            // Check if date is in the fture
            if (activeDate <= currentDate) {
                activeDate.setDate(activeDate.getDate() + 1);
                continue;
            }

            const dateTime = new Date(activeDate.toDateString()).getTime();

            // Check if dateTime is already in the reservedDates
            if (reservedDates.includes(dateTime)) {
                continue;
            }

            reservedDates.push(dateTime);
            activeDate.setDate(activeDate.getDate() + 1);
        }
    }

    res.json(reservedDates.sort((a, b) => a - b));
};

export const updateReservationPayment = async (link: Link) => {
    // Find using the linkId
    const reservation: ReservationDocument | null = await ReservationModel.findOne({
        'status.payment': PaymentStatus.UNPAID,
        'status.reservation': ReservationStatus.PENDING,
        'payment.link': link.id
    }).exec();
    if (!reservation) {
        // Link might be created from the dashboard, and not by the API
        // Therefore, it won't find the reservation
        return;
    }

    // Update the payment info
    reservation.payment = link;
    reservation.status.payment = PaymentStatus.PAID;
    reservation.status.reservation = ReservationStatus.RESERVED;
    await reservation.save();

    await logUpdateReservationStatus(reservation.reservationId, ReservationStatus.PENDING, ReservationStatus.RESERVED);
}
