import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';
import { UserDocument, UserRole } from './user.types';

const userSchema = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            default: id
        },
        name: {
            type: {
                first: { type: String, required: true },
                middle: String,
                last: { type: String, required: true },
                suffix: String
            },
            required: true
        },
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
        contact: { type: String, required: true },
        photo: String,
        description: String,
        license: String,
        passwordResetHash: String
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                const {
                    _id,
                    credentials: { email },
                    name: { first, middle, last, suffix },
                    passwordResetHash,
                    ...rest
                } = ret;

                return { name: { first, middle, last, suffix }, email, ...rest };
            }
        }
    }
);

export default model<UserDocument>('User', userSchema);
