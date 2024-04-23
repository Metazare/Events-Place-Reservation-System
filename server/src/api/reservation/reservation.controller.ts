import { AmenityDocument } from '../amenity/amenity.types';
import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import {
    CreateReservation,
    PaymentStatus,
    ReservationAmenity,
    ReservationStatus
} from './reservation.types';
import { EventsPlaceDocument } from '../eventsPlace/eventsPlace.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import AmenityModel from '../amenity/amenity.model';
import EventsPlaceModel from '../eventsPlace/eventsPlace.model';
import ReservationModel from './reservation.model';

export const getReservations: RequestHandler = async (_req, _res) => {
    
};

const minutesToMillis = 60000;
const daysToMillis = 24 * 60 * minutesToMillis;
export const createReservation: RequestHandler = async (req: BodyRequest<CreateReservation>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { eventsPlaceId, amenities, startDate, days } = body;
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
        duration: { start, end }
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

export const cancelReservation: RequestHandler = async (_req, _res) => {};
