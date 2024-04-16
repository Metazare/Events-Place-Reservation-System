import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from './useAxios';

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

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        await axios
          .get("/auth/users")
          .then((response: any) => {
            console.log(response.data);
            setConversations(response.data);
          });
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
