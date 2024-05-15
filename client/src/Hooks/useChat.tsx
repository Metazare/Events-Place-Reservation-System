import { useEffect } from 'react';
import axios from './useAxios';
import toast from "react-hot-toast";
import { useSocketContext } from '../Context/SocketContext';

export default function useChat() {

    const getConversations = async (): Promise<any>  => {
      try {
        const response = await axios.get("/chat/conversations");
        return response.data;
      } 
      catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message);
        return null;
      } 
    };

    const getMessages = async (receiverId: string): Promise<any>  => {
      try {
        const response = await axios.get(`/chat/messages/?receiverId=${receiverId}`);
        return response.data;
      } 
      catch (error: any) {
        toast.error(error.response?.data?.message);
        return null;
      } 
    }

    const sendMessage = async (receiverId: string, message: string) => {
      try {
        await axios
          .post("/chat/send", {
            receiverId,
            message,
          })
          .then((response: any) => {
            toast.success("Message sent");
          });
      } 
      catch (error: any) {
        toast.error(error.response?.data?.message);
      } 
    }

    // const useListenMessages = () => {
    //   const { socket } = useSocketContext();
    //   // const { messages, setMessages } = useConversation();

    //   useEffect(() => {
    //     socket?.on("newMessage", (newMessage) => {
    //       newMessage.shouldShake = true;
    //       // setMessages([...messages, newMessage]);
    //     });

    //     return () => socket?.off("newMessage");
    //   }, [socket, setMessages, messages]);
    // };

  return {
    getConversations,
    getMessages,
    sendMessage
  };
}
