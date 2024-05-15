import { AmenityDocument } from '../amenity/amenity.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import {
    CancelReservation,
    CreateReservation,
    GetReservation,
    PaymentStatus,
    ReservationAmenity,
    ReservationDocument,
    ReservationPopulatedDocument,
    ReservationQuery,
    ReservationStatus,
    ReservationUser,
    ReservationUserParam
} from './reservation.types';
import { EventsPlaceDocument } from '../eventsPlace/eventsPlace.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import AmenityModel from '../amenity/amenity.model';
import EventsPlaceModel from '../eventsPlace/eventsPlace.model';
import ReservationModel from './reservation.model';
import reservationModel from './reservation.model';

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
    const reservations: ReservationPopulatedDocument[] = await reservationModel
        .find(reservationQuery)
        .populate('renter host eventsPlace')
        .exec();

    res.json(reservations);
};

const minutesToMillis = 60000;
const daysToMillis = 24 * 60 * minutesToMillis;
export const createReservation: RequestHandler = async (req: BodyRequest<CreateReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    console.log(req.body);

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

    // Create reservation
    const reservation = await ReservationModel.create({
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

    setTimeout(() => {
        // Check if reservation is still unpaid
        if (reservation.status.payment === PaymentStatus.UNPAID) {
            // If so, set the reservation status to failed
            reservation.status.reservation = ReservationStatus.FAILED;
            reservation.save();
        }
    }, 10 * minutesToMillis); // 1 day

    res.sendStatus(201);
};

export const payReservation: RequestHandler = async (_req, _res) => {};

export const cancelReservation: RequestHandler = async (req: BodyRequest<CancelReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { reservationId } = body;

    // Find reservation
    const reservation: ReservationDocument | null = await ReservationModel.findOne({
        reservationId,
        renter: user._id
    }).exec();
    if (!reservation) throw new NotFound('Reservation');

    reservation.status.reservation = ReservationStatus.CANCELED;
    await reservation.save();

    res.sendStatus(204);
};
