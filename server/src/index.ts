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

import { createNotification } from './api/notification/notification.controller';
import { CreateNotification } from './api/notification/notification.types';

// Utilities
import { NotFound } from './utilities/errors';
import envs from './utilities/envs';

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        credentials: true
    }
});

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use(authenticate);
app.use('/helpdesk', helpdeskRoute);
app.use('/notification', notificationRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

io.on('connection', (socket) => {
    socket.on('notification', async (req: CreateNotification) => {
        await createNotification(req);
        io.emit('notification', req);
    });

    // socket.on('chat', async (req: CreateMessage) => {
    //     await createMessage(req);
    //     io.emit('chat', req);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);