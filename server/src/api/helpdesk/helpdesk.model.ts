import { hashSync } from 'bcrypt';
import { Schema, model } from 'mongoose';
import { HelpdeskDocument } from './helpdesk.types';
import { id } from '../../utilities/ids';

const helpdeskSchema = new Schema<HelpdeskDocument>(
    {
        id: { 
            type: String, 
            required: true ,
            default: id
        },
        userId: { type: String, required: true },
        eventsPlaceId: { type: String },
        report: { type: String, required: true },
        response: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);

export default model<HelpdeskDocument>('Helpdesk', helpdeskSchema);
