import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
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
import userRoute from './api/user/user.route';

import { createNotification } from './api/notification/notification.controller';
import { CreateNotification } from './api/notification/notification.types';

// Utilities
import { app, server } from './socket/socket';
import { NotFound } from './utilities/errors';
import connectToMongoDB from './database/connectToMongoDB';
import envs from './utilities/envs';

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/eventsplace', eventsPlaceRoute);
app.use('/reservation', reservationRoute);
app.use(authenticate);
app.use('/helpdesk', helpdeskRoute);
app.use('/notification', notificationRoute);
app.use('/chat', chatRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);
