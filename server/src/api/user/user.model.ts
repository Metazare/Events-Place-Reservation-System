import { hashSync } from 'bcrypt';
import { Schema, model } from 'mongoose';
import { UserDocumentBase } from './user.types';

const userSchema = new Schema<UserDocumentBase>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    credentials: {
      type: {
          email: {
              type: String,
              unique: true,
              match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              required: true
          },
          password: {
              type: String,
              set: (value: string): string => hashSync(value, 10),
              required: true
          }
      },
      required: true
    },
    contact: { type: Number, required: true },
    photo: { type: String },
    host: {
      id: { type: String },
      name: { type: String },
      photo: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
);

export default model<UserDocumentBase>('User', userSchema);
