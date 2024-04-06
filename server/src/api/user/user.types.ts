import { Document } from 'mongoose';

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  credentials: {
    email: string;
    password: string;
  };
  contact: number;
  photo?: string;
  host?: {
    id: string;
    name: string;
    photo: string;
  };
}

export interface UserDocumentBase extends Omit<User, 'id'>, Document {
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
