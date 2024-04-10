import { UserRole } from "../user/user.types";

export interface Payload {
    userId: string;
    role: UserRole;
}

export interface RegisterUser {
    role: UserRole;
    email: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffixName?: string;
    contact: string;
    photo?: string;
    description?: string;
    license?: string;
}
