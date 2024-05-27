import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { HelpdeskDocument } from './helpdesk.types';

const helpdeskSchema = new Schema(
    {
        helpdeskid: {
            type: String,
            unique: true,
            default: () => id()
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventsPlace: {
            type: Types.ObjectId,
            ref: 'EventsPlace'
        },
        report: {
            type: String,
            required: true
        },
        response: String
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model<HelpdeskDocument>('Helpdesk', helpdeskSchema);
