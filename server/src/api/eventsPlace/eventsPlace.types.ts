import { Amenity, RawAmenity, UpdateAmenity } from '../amenity/amenity.types';
import { Document, Types } from 'mongoose';
import { Optional } from 'express';
import { UserDocument } from '../user/user.types';

export enum EventsPlaceType {
    RESORT = 'resort',
    HOTEL = 'hotel',
    FUNCTION_ROOM = 'function room'
}

export interface EventsPlace {
    eventsPlaceId: string;
    host: Types.ObjectId | Record<string, unknown>;
    name: string;
    description: string;
    placeType: EventsPlaceType;
    location: string;
    rate: number;
    maxCapacity: number;
    images: string[];
}

export interface EventsPlaceDocument extends EventsPlace, Document {
    host: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface EventsPlacePopulatedDocument extends EventsPlaceDocument {
    host: UserDocument;
}

/* REQUESTS */

export type CreateEventsPlace = {
    amenities: RawAmenity[];
} & Omit<EventsPlace, 'eventsPlaceId' | 'host'>;

export type GetEventsPlace = {
    eventsPlaceId?: string;
};

export type EditEventsPlace = {
    amenities: UpdateAmenity[];
} & Omit<EventsPlace, 'host'>;

export type EventsPlaceQuery = {
    host?: EventsPlaceDocument['_id'];
    eventsPlaceId?: string;
};
