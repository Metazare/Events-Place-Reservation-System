import { Document, Types } from 'mongoose';
import { EventsPlaceDocument, EventsPlacePopulatedDocument } from '../eventsPlace/eventsPlace.types';
import { UserDocument } from '../user/user.types';

export interface Helpdesk {
    helpdeskId: string;
    user: Types.ObjectId | Record<string, unknown>;
    eventsPlace?: Types.ObjectId | Record<string, unknown>;
    report: string;
    response: string;
}

export interface HelpdeskDocument extends Helpdesk, Document {
    user: UserDocument['_id'];
    eventsPlace?: EventsPlaceDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface HelpdekPopulatedDocument extends HelpdeskDocument {
    user: UserDocument;
    eventsPlace?: EventsPlacePopulatedDocument;
}

export type GetHelpdeskEntry = {
    id?: string;
    userId?: string;
};
