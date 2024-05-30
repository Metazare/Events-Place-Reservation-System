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
import chatRoute from './api/chat/message.route';
import eventsPlaceRoute from './api/eventsPlace/eventsPlace.route';
import helpdeskRoute from './api/helpdesk/helpdesk.route';
import notificationRoute from './api/notification/notification.route';
import reservationRoute from './api/reservation/reservation.route';
import reviewRoute from './api/review/review.route';
import userRoute from './api/user/user.route';
import emailRoute from './api/email/email.route';
import { createAdminAccount } from './api/user/user.controller';

// Utilities
import { app, server } from './socket/socket';
import { NotFound } from './utilities/errors';
import envs from './utilities/envs';

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use('/email', emailRoute);
app.use('/eventsplace', eventsPlaceRoute);
app.use('/reservation', reservationRoute);
app.use('/user', userRoute);
app.use('/notification', notificationRoute);
app.use(authenticate);
app.use('/chat', chatRoute);
app.use('/helpdesk', helpdeskRoute);
app.use('/review', reviewRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to database'))
    .then(createAdminAccount)
    .then(() => server.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch(console.error);
