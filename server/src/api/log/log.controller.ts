import { EventsPlace } from '../eventsPlace/eventsPlace.types';
import { LogEvent } from './log.types';
import { Reservation, ReservationStatus } from '../reservation/reservation.types';
import { Review } from '../review/review.types';
import { User } from '../user/user.types';
import logModel from './log.model';

export const logRegisterRenter = async (userId: User['userId']) => {
    await logModel.create({
        event: LogEvent.REGISTER_RENTER,
        message: `A new user is registered with a userId ${userId}`,
        userId
    });
};

export const logRegisterHost = async (userId: User['userId']) => {
    await logModel.create({
        event: LogEvent.REGISTER_HOST,
        message: `A user with userId ${userId} is now a renter`,
        userId
    });
};

export const logCreateEventsPlace = async (hostId: User['userId'], eventsPlaceId: EventsPlace['eventsPlaceId']) => {
    await logModel.create({
        event: LogEvent.CREATE_EVENTS_PLACE,
        message: `User ${hostId} created a new events place with an eventsPlaceId ${eventsPlaceId}`,
        hostId,
        eventsPlaceId
    });
};

export const logCreateReview = async (
    reviewId: Review['reviewId'],
    reviewerId: User['userId'],
    eventsPlaceId: EventsPlace['eventsPlaceId']
) => {
    await logModel.create({
        event: LogEvent.CREATE_REVIEW,
        message: `User ${reviewerId} created a new review for an eventsPlace ${eventsPlaceId}`,
        reviewerId,
        reviewId,
        eventsPlaceId
    });
};

export const logCreateReservation = async (
    reserveeId: User['userId'],
    eventsPlaceId: EventsPlace['eventsPlaceId'],
    reservationId: Reservation['reservationId']
) => {
    await logModel.create({
        event: LogEvent.CREATE_RESERVATION,
        message: `User ${reserveeId} created a new reservation at eventsPlace ${eventsPlaceId}`,
        reserveeId,
        eventsPlaceId,
        reservationId
    });
};

export const logUpdateReservationStatus = async (
    reservationId: Reservation['reservationId'],
    oldStatus: ReservationStatus,
    newStatus: ReservationStatus
) => {
    await logModel.create({
        event: LogEvent.UPDATE_RESERVATION_STATUS,
        message: `Reservation ${reservationId} changed status from ${oldStatus} to ${newStatus}`,
        reservationId,
        oldStatus,
        newStatus
    });
};
