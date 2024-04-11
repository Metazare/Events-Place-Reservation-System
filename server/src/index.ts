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
import helpdeskRoute from './api/helpdesk/helpdesk.route';
import notificationRoute from './api/notification/notification.route';
import chatRoute from './api/chat/message.route';

import { createNotification } from './api/notification/notification.controller';
import { CreateNotification } from './api/notification/notification.types';

// Utilities
import { NotFound } from './utilities/errors';
import envs from './utilities/envs';
import connectToMongoDB from "./database/connectToMongoDB";
import { app, server } from "./socket/socket";

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use(authenticate);
app.use('/helpdesk', helpdeskRoute);
app.use('/notification', notificationRoute);
app.use('/chat', chatRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
