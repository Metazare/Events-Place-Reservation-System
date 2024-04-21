import { EventsPlaceDocument, EventsPlaceType } from './eventsPlace.types';
import { id } from '../../utilities/ids';
import { Schema, Types, model } from 'mongoose';

const eventsPlaceSchema = new Schema(
    {
        eventsPlaceId: {
            type: String,
            unique: true,
            default: () => id()
        },
        host: {
            type: Types.ObjectId,
            ref: 'Host',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        placeType: {
            type: String,
            enum: {
                values: Object.values(EventsPlaceType),
                message: '{VALUE} is not supported'
            },
            required: true
        },
        location: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        maxCapacity: {
            type: Number,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model<EventsPlaceDocument>('EventsPlace', eventsPlaceSchema);
