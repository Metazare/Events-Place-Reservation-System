import { useEffect } from "react";
import axios from "./useAxios";
import toast from "react-hot-toast";
import { useSocketContext } from "../Context/SocketContext";

export default function useChat() {
    const getConversations = async (): Promise<any> => {
        try {
            const response = await axios.get("/chat/conversations");
            return response.data;
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message);
            return null;
        }
    };

    const getMessages = async (receiverId: string): Promise<any> => {
        try {
            const response = await axios.get(
                `/chat/messages/?receiverId=${receiverId}`
            );
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return null;
        }
    };

    const sendMessage = async (receiverId: string, message: string) => {
        try {
            await axios
                .post("/chat/send", {
                    receiverId,
                    message,
                })
                .then((response: any) => {
                  console.log(response);
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

    return {
        getConversations,
        getMessages,
        sendMessage,
        useListenMessages,
    };
}
