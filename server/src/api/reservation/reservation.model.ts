import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { PaymentStatus, ReservationDocument, ReservationStatus } from './reservation.types';

const reservationSchema = new Schema(
    {
        reservationId: {
            type: String,
            unique: true,
            default: () => id(2)
        },
        renter: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        host: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventsPlace: {
            type: Types.ObjectId,
            ref: 'EventsPlace',
            required: true
        },
        guestCount: {
            type: Number,
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
                },
                rate: {
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
            type: {
                payment: {
                    type: String,
                    enum: Object.values(PaymentStatus),
                    default: PaymentStatus.UNPAID
                },
                reservation: {
                    type: String,
                    enum: Object.values(ReservationStatus),
                    default: ReservationStatus.PENDING
                }
            },
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model<ReservationDocument>('Reservation', reservationSchema);
