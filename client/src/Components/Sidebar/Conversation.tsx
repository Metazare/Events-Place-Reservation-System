import React from "react";
import { useSocketContext } from "../../Context/SocketContext";
import useConversation from "../../Zustand/useConversation";

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

interface ConversationProps {
    conversation: Conversation;
    lastIdx: boolean;
    emoji: string;
    }

const Conversation: React.FC<ConversationProps> = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						{/* <img src={conversation.photo} alt='user avatar' /> */}
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						{/* <p className='font-bold text-gray-200'>{conversation.firstName}</p> */}
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
