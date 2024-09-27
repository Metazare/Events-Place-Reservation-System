import { Document, Types } from 'mongoose';
import { EventsPlaceDocument, EventsPlacePopulatedDocument } from '../eventsPlace/eventsPlace.types';
import { UserDocument } from '../user/user.types';

export enum ReservationStatus {
    PENDING = 'pending',
    RESERVED = 'reserved',
    FAILED = 'failed',
    CANCELED = 'canceled'
}

export enum PaymentStatus {
    PAID = 'paid',
    UNPAID = 'unpaid'
}

export type Duration = {
    start: Date;
    end: Date;
};

export type ReservationAmenity = {
    amenityId: string;
    quantity: number;
    rate: number;
};

export interface Reservation {
    reservationId: string;
    renter: Types.ObjectId | Record<string, unknown>;
    host: Types.ObjectId | Record<string, unknown>;
    eventsPlace: Types.ObjectId | Record<string, unknown>;
    amenities: ReservationAmenity[];
    guestCount: number;
    duration: Duration;
    status: {
        payment: PaymentStatus;
        reservation: ReservationStatus;
    };
}

export interface ReservationDocument extends Reservation, Document {
    renter: UserDocument['_id'];
    host: UserDocument['_id'];
    eventsPlace: EventsPlaceDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReservationPopulatedDocument extends ReservationDocument {
    renter: UserDocument;
    host: UserDocument;
    eventsPlace: EventsPlacePopulatedDocument;
}

/* REQUESTS */

export type CreateReservation = {
    eventsPlaceId: string;
    amenities: {
        amenityId: string;
        quantity: number;
    }[];
    guestCount: number;
    startDate: number;
    days: number;
};

export type GetReservation = {
    reservationId?: string;
    eventsPlaceId?: string;
};

export enum ReservationUser {
    HOST = 'host',
    RENTER = 'renter'
}

export type ReservationUserParam = {
    reservationUser: ReservationUser;
};

export type ReservationQuery = {
    renter?: UserDocument['_id'];
    host?: UserDocument['_id'];
    eventsPlace?: EventsPlaceDocument['_id'];
    reservationId?: string;
}

export type CancelReservation = {
    reservationId: string;
}

export type PayReservation = {
    reservationId: string;
    totalCost: number;
}
