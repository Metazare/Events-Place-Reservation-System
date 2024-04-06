import { RegisterUser, UserDocumentBase } from '../user/user.types';

export enum Role {
    ADMIN = 'admin',
    RENTER = 'renter',
    HOST = 'host'
}

export interface Payload {
    userId: string;
    role: Role;
}

export type UserDocument = UserDocumentBase;

export interface User {
    userId?: string;
    document: UserDocument;
    role: Role;
}

export interface SocketUser {
    userId: string;
    role: Role;
}

export type UserLogin = {
    email: string;
    password: string;
    oauth?: boolean;
};

export type UserRegister = (RegisterUser) & { role: Role };
