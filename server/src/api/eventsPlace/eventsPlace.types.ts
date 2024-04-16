import { Document, Types } from 'mongoose';
import { UserDocument } from '../user/user.types';

export enum EventsPlaceType {
    RESORT = 'resort',
    HOTEL = 'hotel',
    FUNCTION_ROOM = 'function room'
}

export enum AmenityType {
    ONE_TIME = 'one time',
    PER_DAY = 'per day',
    PER_QUANTITY = 'per quantity'
}

export interface Amenity {
    name: string;
    amenityType: AmenityType;
    rate: number;
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
    amenities: Amenity[];
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

export type CreateEventsPlace = Omit<EventsPlace, 'eventsPlaceId' | 'host'>;

export type GetEventsPlace = {
    eventsPlaceId?: string;
}

export type EditEventsPlace = Omit<EventsPlace, 'host'>;

export type EventsPlaceQuery = {
    host?: EventsPlaceDocument['_id'];
    eventsPlaceId?: string;
}
