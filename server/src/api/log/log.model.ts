import { Schema, model } from 'mongoose';
import { LogDocument, LogEvent } from './log.types';
import { id } from '../../utilities/ids';

const logSchema = new Schema(
    {
        logId: {
            type: String,
            unique: true,
            default: () => id(3)
        },
        event: {
            type: String,
            enum: Object.values(LogEvent),
            required: true
        },
        message: {
            type: String,
            required: true
        },
        userId: String,
        ownerId: String,
        hostId: String,
        reviewerId: String,
        reserveeId: String,
        eventsPlaceId: String,
        reservationId: String,
        reviewId: String,
        oldStatus: Boolean,
        newStatus: Boolean
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model<LogDocument>('Log', logSchema);
