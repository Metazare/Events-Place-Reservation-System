import { AmenityDocument, AmenityState, AmenityType } from './amenity.types';
import { id } from '../../utilities/ids';
import { Schema, Types, model } from 'mongoose';

const amenitySchema = new Schema(
    {
        amenityId: {
            type: String,
            unique: true,
            default: () => id(2)
        },
        eventsPlace: {
            type: Types.ObjectId,
            ref: 'EventsPlace',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        amenityType: {
            type: String,
            enum: {
                values: Object.values(AmenityType),
                message: '{VALUE} is not supported'
            },
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            enum: Object.values(AmenityState)
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model<AmenityDocument>('Amenity', amenitySchema);
