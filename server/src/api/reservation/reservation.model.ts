import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { ReservationDocument, ReservationStatus } from './reservation.types';

const reservationSchema = new Schema(
    {
        reservationId: {
            type: String,
            unique: true,
            default: () => id(2)
        },
        renter: {
            type: Types.ObjectId,
            ref: 'EventsPlace',
            required: true
        },
        host: {
            type: Types.ObjectId,
            ref: 'Host',
            required: true
        },
        eventsPlace: {
            type: Types.ObjectId,
            ref: 'EventsPlace',
            required: true
        },
        amenities: [
            {
                amenityId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        duration: {
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            }
        },
        status: {
            type: String,
            enum: {
                values: Object.values(ReservationStatus),
                message: '{VALUE} is not supported'
            },
            default: ReservationStatus.PENDING
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model<ReservationDocument>('Reservation', reservationSchema);
