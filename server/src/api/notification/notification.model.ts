import { id } from "../../utilities/ids";
import { NotificationDocument, NotificationStatus } from "./notification.types";
import { Schema, Types, model } from "mongoose";

const notificationSchema = new Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            minLength: 1,
            required: true,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
            enum: {
                values: Object.values(NotificationStatus),
                message: '"{VALUE} is not supported"',
            },
            default: NotificationStatus.UNREAD,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model<NotificationDocument>("Notification", notificationSchema);
