import { Document } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    RENTER = 'renter',
    HOST = 'host'
}

export interface User {
    userId: string;
    role: UserRole;
    name: {
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
    }
    credentials: {
        email: string;
        password: string;
    };
    contact: string;
    photo?: string;
    description?: string;
    license?: string;
}

export interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends UserDocumentBase {
  id: string;
}

export type RegisterUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type CheckEmail = Pick<User['credentials'], 'email'>;
export type UpdateUser = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
export type LoginUser = Pick<User['credentials'], 'email' | 'password'>;
