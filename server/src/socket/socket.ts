import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";
import envs from './../utilities/envs';

import { sendMessage } from "../api/chat/message.controller";

const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

const app: Application = express();

const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});

interface UserSocketMap {
    [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId: string = socket.handshake.query.userId as string;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    console.log(userId);

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on('chat', async (req: CreateMessage) => {
    //     await sendMessage(req);
    //     io.emit('chat', req);
    // });

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
