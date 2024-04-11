import { Document, Types } from "mongoose";
import { UserDocument } from "../auth/auth.types";
import { EventsPlaceDocument, EventsPlacePopulatedDocument } from "../eventsPlace/eventsPlace.types";

export enum ReservationStatus {
    PENDING = 'pending',
    RESERVED = 'reserved',
    FAILED = 'failed',
    CANCELED = 'canceled'
}

export interface Reservation {
    reservationId: string;
    renter: Types.ObjectId | Record<string, unknown>;
    host: Types.ObjectId | Record<string, unknown>;
    eventsPlace: Types.ObjectId | Record<string, unknown>;
    status: ReservationStatus;
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