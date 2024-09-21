import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { CreateNotification, NotificationStatus, ReadNotification, GetNotification, NotificationDocument } from './notification.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import NotificationModel from './notification.model';

// Get all notifications for the authenticated user
export const getNotifications: RequestHandler = async (req: QueryRequest<GetNotification>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = req.user;

    console.log(user.userId);

    const notifications = await NotificationModel.find({ userId: user.userId }).exec();

    res.json(notifications);
};

// Create a new notification
export const createNotification: RequestHandler = async (req: BodyRequest<CreateNotification>, res) => {
    console.log("Called")
    const { userId, type, content } = req.body;

    const checker = new CheckData();
    checker.checkType(userId, 'string', 'userId');
    checker.checkType(type, 'string', 'type');
    checker.checkType(content, 'string', 'content');

    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const notification = await NotificationModel.create({
        userId,
        type,
        content,
        status: NotificationStatus.UNREAD // Set default status to UNREAD
    });

    res.status(201).json(notification);
};

// Mark a notification as read
export const readNotification: RequestHandler = async (req: BodyRequest<ReadNotification>, res) => {
    const { notificationId } = req.body;

    const checker = new CheckData();
    checker.checkType(notificationId, 'string', 'notificationId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const notification = await NotificationModel.findOneAndUpdate(
        { _id: notificationId },
        { status: NotificationStatus.READ },
        { new: true } // Return the updated document
    ).exec();

    if (!notification) throw new NotFound('Notification');

    res.json(notification);
};
