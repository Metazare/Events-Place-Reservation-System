import { Role, User } from '../../api/auth/auth.types';
import { UserDocument } from '../../api/user/user.types';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

declare module 'express' {
    export interface BodyRequest<T> extends Request<{}, {}, T> {}
    export interface QueryRequest<T> extends Request<{}, {}, {}, T> {}
}
