import { Document } from 'mongoose';
import { EventsPlace } from '../eventsPlace/eventsPlace.types';
import { Reservation, ReservationStatus } from '../reservation/reservation.types';
import { Review } from '../review/review.types';
import { User } from '../user/user.types';

export enum LogEvent {
    REGISTER_RENTER = 'register renter',
    REGISTER_HOST = 'register host',
    CREATE_EVENTS_PLACE = 'create events place',
    CREATE_REVIEW = 'create review',
    CREATE_RESERVATION = 'create reservation',
    UPDATE_RESERVATION_STATUS = 'create reservation status'
}

export interface BaseLog {
    logId: string;
    event: LogEvent;
    message: string;
}

export interface RegisterEventLog extends BaseLog {
    userId: User['userId'];
}

export interface CreateEventsPlaceLog extends BaseLog {
    ownerId: User['userId'];
    hostId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
}

export interface CreateReviewLog extends BaseLog {
    reviewerId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
    reviewId: Review['reviewId'];
}

export interface CreateReservationLog extends BaseLog {
    reserveeId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
    reservationId: Reservation['reservationId'];
}

export interface UpdateReservationStatus extends BaseLog {
    reservationId: Reservation['reservationId'];
    oldStatus: ReservationStatus;
    newStatus: ReservationStatus;
}

export type Log =
    | RegisterEventLog
    | CreateEventsPlaceLog
    | CreateReviewLog
    | CreateReservationLog
    | UpdateReservationStatus;

// prettier-ignore
export type LogDocument = Log & Document & {
    createdAt: Date;
    updatedAt: Date;
} ;
