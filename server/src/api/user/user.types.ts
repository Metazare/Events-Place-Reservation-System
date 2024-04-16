import { Document } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    RENTER = 'renter',
    HOST = 'host'
}

export interface User {
    userId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
    };
    credentials: {
        email: string;
        password: string;
    };
    contact: string;
    photo?: string;
    description?: string;
    license?: string;
    passwordResetHash?: string;
}

export interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* REQUESTS */

export type EditUserInfo = {
    firstName: string;
    middleName: string;
    lastName: string;
    suffixName: string;
    contact: string;
    photo: string;
    description: string;
    license: string;
};

export type GetUser = {
    userId?: string;
};

export type EditUserCredentials = {
    email: string;
    password: string;
};

export type ForgotPassword = {
    email: string;
};

export type PasswordHashContent = {
    hash: string;
    email: string;
    due: Date;
};

export type ResetPassword = {
    password: string;
} & VerifyHash;

export type VerifyHash = {
    hash: string;
}
