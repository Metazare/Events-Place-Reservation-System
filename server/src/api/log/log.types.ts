import { Document, Types } from 'mongoose';
import { EventsPlace } from '../eventsPlace/eventsPlace.types';
import { Reservation, ReservationStatus } from '../reservation/reservation.types';
import { Review } from '../review/review.types';
import { User, UserDocument } from '../user/user.types';

export enum LogEvent {
    REGISTER_RENTER = 'register renter',
    REGISTER_HOST = 'register host',
    CREATE_EVENTS_PLACE = 'create events place',
    CREATE_REVIEW = 'create review',
    CREATE_RESERVATION = 'create reservation',
    UPDATE_RESERVATION_STATUS = 'create reservation status'
}

export interface Log {
    logId: string;
    event: LogEvent;
    message: string;
    user: Types.ObjectId | Record<string, unknown>;
    hostId?: string;
    reviewerId?: string;
    reserveeId?: string;
    eventsPlaceId?: string;
    reservationId?: string;
    reviewId?: string;
    oldStatus?: ReservationStatus;
    newStatus?: ReservationStatus;
}

export interface CreateEventsPlaceLog extends Log {
    hostId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
}

export interface CreateReviewLog extends Log {
    reviewerId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
    reviewId: Review['reviewId'];
}

export interface CreateReservationLog extends Log {
    reserveeId: User['userId'];
    eventsPlaceId: EventsPlace['eventsPlaceId'];
    reservationId: Reservation['reservationId'];
}

export interface UpdateReservationStatusLog extends Log {
    reservationId: Reservation['reservationId'];
    oldStatus: ReservationStatus;
    newStatus: ReservationStatus;
}

export interface LogDocument extends Log, Document {
    user: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface LogPopulatedDocument extends LogDocument {
    user: UserDocument;
}
