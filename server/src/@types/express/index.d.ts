import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
          
        }
    }
}

declare module 'express' {
    export interface BodyRequest<T> extends Request<{}, {}, T> {}
    export interface QueryRequest<T> extends Request<{}, {}, {}, T> {}
}
