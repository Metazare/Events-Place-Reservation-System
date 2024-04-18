import { Document, Types } from "mongoose";
import { EventsPlaceDocument, EventsPlacePopulatedDocument } from "../eventsPlace/eventsPlace.types";
import { UserDocument } from "../user/user.types";
import { ReserveAmenity } from "../amenity/amenity.types";

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
    amenities: ReserveAmenity[];
    duration: Duration;
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

/* REQUESTS */

export type CreateReservation = {
    eventsPlaceId: string;
    amenities: ReserveAmenity[];
    startDate: number;
    days: number;
}

export type Duration = {
    start: Date;
    end: Date;
}