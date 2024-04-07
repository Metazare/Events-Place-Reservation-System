import { Document } from 'mongoose';

export interface User {
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

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type RegisterUser = Omit<User, 'createdAt' | 'updatedAt'> & { role: string };
export type CheckEmail = Pick<User['credentials'], 'email'>;
export type UpdateUser = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
export type LoginUser = Pick<User['credentials'], 'email' | 'password'>;
