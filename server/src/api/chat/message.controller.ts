import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { getReceiverSocketId, io } from "../../socket/socket";
import { CheckData } from '../../utilities/checkData';
import { Conflict, NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import Message from './message.model';
import { MessageDocument, GetMessageData } from './message.types';
import Conversation from './conversation.model';

export const sendMessage: RequestHandler = async (req: BodyRequest<MessageDocument>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;
    const senderId = user._id;

    const { receiverId, message } = req.body;

    const checker = new CheckData();
    checker.checkType(receiverId, 'string', 'receiverId');
    checker.checkType(message, 'string', 'message');

    if (!senderId) {
        throw new Error("Sender ID not found");
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });

    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.sendStatus(201);
};

export const getMessages: RequestHandler = async (req: QueryRequest<GetMessageData>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const senderId = user._id;

    const { receiverId } = req.query;
    const checker = new CheckData();
    checker.checkType(receiverId, 'string', 'receiverId');

    if (!senderId) {
        throw new Error("Sender ID not found");
    }

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
        res.status(200).json([]);
        return;
    }

    const messages = conversation.messages;

    res.json(messages);
};