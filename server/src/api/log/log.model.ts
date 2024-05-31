import { Schema, Types, model } from 'mongoose';
import { LogDocument, LogEvent } from './log.types';
import { id } from '../../utilities/ids';
import { ReservationStatus } from '../reservation/reservation.types';

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
        hostId: String,
        reviewerId: String,
        reserveeId: String,
        eventsPlaceId: String,
        reservationId: String,
        reviewId: String,
        oldStatus: {
            type: String,
            enum: {
                values: Object.values(ReservationStatus),
                message: '{VALUE} is not supported'
            }
        },
        newStatus: {
            type: String,
            enum: {
                values: Object.values(ReservationStatus),
                message: '{VALUE} is not supported'
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model<LogDocument>('Log', logSchema);
