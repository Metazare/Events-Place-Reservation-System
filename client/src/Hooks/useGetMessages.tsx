import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import axios from './useAxios';

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      console.log(selectedConversation?._id)
      setLoading(true);
      try {
        await axios
          .get("/auth/users", {
            params: {
              conversationId: selectedConversation?._id,
            },
          })
          .then((response: any) => {
            setMessages(response.data);
            
          });

        const res = await fetch(`/api/messages/${selectedConversation?._id}`);
        const data: Message[] = await res.json();
      } catch (error: any) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
