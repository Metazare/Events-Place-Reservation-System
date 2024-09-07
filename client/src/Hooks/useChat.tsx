import { useEffect, useState } from "react";
import axios from "./useAxios";
import toast from "react-hot-toast";
import { useSocketContext } from "../Context/SocketContext";
import useUser from "src/Hooks/useUser";
import { useAuthContext } from "src/Context/AuthContext";

interface UserData {
    userId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
    };
    credentials: {
        email: string;
        password: string;
        passwordResetHash?: string;
    };
    contact: string;
    isAdmin?: boolean;
    photo?: string;
    description?: string;
    license?: string;
}

export default function useChat() {
    const { authUser } = useAuthContext();
    const [conversations, setConversations] = useState<any[]>([]);
    const getConversations = async (): Promise<any[]> => {
        try {
            const response = await axios.get("/chat/conversations");
            console.log(response.data);
            const sortedData = response.data.sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
            );

            const updatedConversations = await Promise.all(
                sortedData.map(async (conversation: any) => {
                    const participant = conversation.participants
                        .find(
                            (participant: any) =>
                                participant !== authUser?.userId
                        )
                        ?.toString();

                    const participantData = await getUserInfo(participant);

                    const updatedConversation = {
                        ...conversation,
                        participant: participantData,
                    };

                    return updatedConversation;
                })
            );

            setConversations(updatedConversations);

            return updatedConversations;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            // setConversations([]);
            return [];
        }
    };

    const [messages, setMessages] = useState<any[]>([]);
    const getMessages = async (receiverId: string): Promise<any> => {
        try {
            const response = await axios.get(
                `/chat/messages/?receiverId=${receiverId}`
            );
            setMessages(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            setMessages([]);
        }
    };

    const sendMessage = async (
        receiverId: string,
        message: string,
        senderId: string
    ) => {
        try {
            await axios
                .post("/chat/send", {
                    receiverId,
                    message,
                })
                .then(() => {
                    setMessages((prevMessages: any) => [
                        ...prevMessages,
                        {
                            senderId: senderId,
                            message,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ]);
                });
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    };

    function useListenMessages(setMessages: any) {
        const { socket } = useSocketContext();
        useEffect(() => {
            socket?.on("newMessage", (message: any) => {
                setMessages((prevMessages: any) => [...prevMessages, message]);
            });
            return () => {
                socket?.off("newMessage");
            };
        }, [socket, setMessages]);
    }

    const { getUserInfo } = useUser();
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const SelectUser = async (userId: string) => {
        try {
            const data = await getUserInfo(userId);
            setSelectedUser(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return {
        conversations,
        getConversations,
        messages,
        getMessages,
        setMessages,
        sendMessage,
        useListenMessages,
        selectedUser,
        SelectUser,
    };
}
