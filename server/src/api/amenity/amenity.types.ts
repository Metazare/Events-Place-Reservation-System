import { Document, Types } from "mongoose";
import { EventsPlaceDocument, EventsPlacePopulatedDocument } from "../eventsPlace/eventsPlace.types";
import { Optional } from "express";

export enum AmenityType {
    ONE_TIME = 'one time',
    PER_DAY = 'per day',
    PER_QUANTITY = 'per quantity'
}

export enum AmenityState {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface Amenity {
    amenityId: string;
    eventsPlace: Types.ObjectId | Record<string, unknown>;
    name: string;
    amenityType: AmenityType;
    rate: number;
    state: AmenityState;
}

export interface AmenityDocument extends Amenity, Document {
    eventsPlace: EventsPlaceDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface AmenityPopulatedDocument extends AmenityDocument {
    eventsPlace: EventsPlacePopulatedDocument;
}

export type RawAmenity = Omit<Amenity, 'amenityId' | 'eventsPlace'>;

export type UpdateAmenity = RawAmenity & Optional<Amenity, 'amenityId'>;

export type ReserveAmenity = {
    amenityId: string;
    quantity: number;
}
