import { Document, Types } from "mongoose";
import { EventsPlaceDocument } from "../eventsPlace/eventsPlace.types";
import { UserDocument } from "../user/user.types";

export interface Review {
    reviewId: string;
    eventsPlace: Types.ObjectId | Record<string, unknown>;
    reviewer: Types.ObjectId | Record<string, unknown>;
    comment?: string;
    rating: number;
}

export interface ReviewDocument extends Review, Document {
    eventsPlace: EventsPlaceDocument['_id'];
    reviewer: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewPopulatedDocument extends ReviewDocument {
    eventsPlace: ReviewPopulatedDocument;
}

/* REQUESTS */

export type CreateReview = {
    rating: number;
    eventsPlaceId: string;
    comment?: string;
}

export type GetReviews = {
    eventsPlaceId?: string;
    reviewId?: string;
}