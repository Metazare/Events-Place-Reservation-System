import mongoose, { Document, Schema } from "mongoose";

export interface CMS extends Document {
    logo: String;
    color: String;
}

const cmsSchema = new Schema<CMS>({
    logo: { type: String },
    color: { type: String },
});

export default mongoose.model<CMS>("CMS", cmsSchema);
