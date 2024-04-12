import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from './useAxios';
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../Zustand/useConversation";

interface User {
  first: string;
  middle: string;
  last: string;
  contact: number;
  email: string;
  password: string;
  role: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}

interface Conversation {
  _id: string;
  participants: User[];
  messages: Message[];
}

const useMessage = () => {
  const [loadingConversations, setLoadingConversations] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoadingConversations(true);
      try {
        const response = await axios.get("/api/users");
        setConversations(response.data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoadingConversations(false);
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      try {
        if (selectedConversation?._id) {
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const data: Message[] = await res.json();
          setMessages(data);
        }
      } catch (error: any) {
        toast.error((error as Error).message);
      } finally {
        setLoadingMessages(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessages]);

  return { 
    loadingConversations, 
    loadingMessages, 
    conversations, 
    messages 
  };
};

export default useMessage;
