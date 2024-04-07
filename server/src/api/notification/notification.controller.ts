import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { CreateNotification, NotificationStatus, ReadNotification } from './notification.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import NotificationModel from './notification.model';

export const getNotifications: RequestHandler = async (req, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const notifications = await NotificationModel.find({ userId: user._id }).exec();

    res.json(notifications);
};

export const createNotification: RequestHandler = async (req: BodyRequest<CreateNotification>, res) => {
    const { userId, type, content } = req.body;

    const checker = new CheckData();
    checker.checkType(userId, 'string', 'userId');
    checker.checkType(type, 'string', 'type');
    checker.checkType(content, 'string', 'content');

    await NotificationModel.create({
        userId,
        type,
        content,
    });

    res.sendStatus(204);
};

export const readNotification: RequestHandler = async (req: BodyRequest<ReadNotification>, res) => {
    const { notificationId } = req.body;

    const checker = new CheckData();
    checker.checkType(notificationId, 'string', 'notificationId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const notification = await NotificationModel.findOneAndUpdate(
        { _id: notificationId },
        { status: NotificationStatus.READ }
    ).exec();
    if (!notification) throw new NotFound('Notification');

    res.sendStatus(204);
};
