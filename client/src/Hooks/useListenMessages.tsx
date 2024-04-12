import { useEffect } from "react";

import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../Zustand/useConversation";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages([...messages, newMessage]);
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

  // Return nothing as this hook performs a side effect
  return;
};

export default useListenMessages;
