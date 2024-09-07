import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// Hooks
import useChat from "src/Hooks/useChat";
import { useAuthContext } from "src/Context/AuthContext";

export default function TestToast() {
    const { userId } = useParams();
    const { authUser } = useAuthContext();
    const {
        conversations,
        getConversations,
        messages,
        getMessages,
        setMessages,
        sendMessage,
        useListenMessages,
        getParticipant,
        selectedUser,
        SelectUser,
    } = useChat();

    const [selectedConversation, setSelectedConversation] = useState<any>(null);

    const GetMessages = async (receiverId: string, conversation) => {
        setSelectedConversation(conversation);
        SelectUser(receiverId);
        getMessages(receiverId);
    };

    useEffect(() => {
        getConversations();
    }, []);

    const [messageText, setMessageText] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
    };

    const handleSendMessage = () => {
        if (userId) {
            sendMessage(userId, messageText, authUser?.userId || "");
        } else if (selectedUser?.userId) {
            sendMessage(
                selectedUser?.userId,
                messageText,
                authUser?.userId || ""
            );
        } else {
            toast.error("No user selected");
        }

        setMessageText("");
    };

    useListenMessages(setMessages);

    return (
        <div className="flex">
            <div className="w-1/4">
                <div className="sidebar">
                    {conversations?.map((conversation) => {
                        const participant = getParticipant(
                            authUser,
                            conversation
                        );
                        return (
                            <React.Fragment key={conversation._id}>
                                <button
                                    onClick={() => {
                                        GetMessages(participant, conversation);
                                    }}
                                >
                                    {participant}
                                </button>
                                <br />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="w-3/4">
                <div className="main">
                    <h1>
                        {selectedUser?.name?.first} {selectedUser?.name?.last}
                    </h1>
                    {messages?.map((message) => {
                        const isReceiver =
                            message.receiverId === authUser?.userId;
                        const isSender = message.senderId === authUser?.userId;
                        const fontColor = isReceiver
                            ? "red"
                            : isSender
                            ? "green"
                            : "black";
                        return (
                            <React.Fragment key={message._id}>
                                <p style={{ color: fontColor }}>
                                    {message.message}
                                </p>
                            </React.Fragment>
                        );
                    })}
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={messageText}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}
