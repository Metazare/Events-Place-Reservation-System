import mongoose, { Document, Schema } from "mongoose";

export interface CMS extends Document {
    name: String;
    phone: String;
    email: String;
    logo: String;
    color: String;
}

const cmsSchema = new Schema<CMS>({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    logo: { type: String },
    color: { type: String }
});

export default mongoose.model<CMS>("CMS", cmsSchema);
