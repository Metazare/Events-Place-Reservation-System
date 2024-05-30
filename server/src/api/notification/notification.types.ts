import { Document } from 'mongoose';
import { UserDocument } from '../user/user.types';

export enum NotificationStatus {
    READ = 'read',
    UNREAD = 'unread',
}

export enum NotificationType {
    GENERAL = "general", 
    RESERVATION = 'reservation',
    HELPDESK = 'helpdesk',
}

export interface Notification {
    userId: string;
    type: string;
    content: string;
    status: NotificationStatus;
}

export interface NotificationDocument extends Notification, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNotification {
    userId: string;
    type: string;
    content: string;
}

export interface ReadNotification {
    notificationId: string;
}

export type GetNotification = {
    notificationId?: string;
}