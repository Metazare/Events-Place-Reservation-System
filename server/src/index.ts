import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Middlewares
import authenticate from './middlewares/authenticate';
import errorHandler from './middlewares/errorHandler';

// Routes
import authRoute from './api/auth/auth.route';

// Utilities
import { NotFound } from './utilities/errors';
import envs from './utilities/envs';

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

const app = express();

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use(authenticate);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);
