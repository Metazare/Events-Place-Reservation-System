import { Schema, Types, model } from 'mongoose';
import { ReviewDocument } from './review.types';
import { id } from '../../utilities/ids';

const reviewSchema = new Schema(
    {
        reviewId: {
            type: String,
            unique: true,
            default: () => id(2)
        },
        eventsPlace: {
            type: Types.ObjectId,
            ref: 'EventsPlace',
            required: true
        },
        reviewer: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: String,
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model<ReviewDocument>('Review', reviewSchema);
