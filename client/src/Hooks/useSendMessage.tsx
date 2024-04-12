import { useState } from "react";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import axios from './useAxios';

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}

const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        setLoading(true);
        console.log(selectedConversation?._id)
        console.log(message)
        try {
            await axios
                .post("/chat/send", { 
                    receiverId: selectedConversation?._id,
                    message: message
                })
                .then((response: any) => {
                    console.log(response.data);
                    setMessages([...messages, response.data]);
                });
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
