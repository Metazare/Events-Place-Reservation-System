export interface MessageDocument extends Document {
    senderId: string;
    receiverId: string;
    message: string;
}

export type GetMessageData = {
    receiverId?: string;
};