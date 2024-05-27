import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Hooks
import useChat from 'src/Hooks/useChat';
import useUser from 'src/Hooks/useUser';
import { useAuthContext } from 'src/Context/AuthContext'

export default function TestToast() {
    const { userId } = useParams();
    const {authUser} = useAuthContext();
    const { getConversations, getMessages, sendMessage } = useChat();
    const {getUserInfo} = useUser();

    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const GetConversations = async () => {
        try {
            const data = await getConversations();
            console.log(data)
            setConversations(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const GetMessages = async (receiverId: string, conversation) => {
        setSelectedConversation(conversation);
        SelectUser(receiverId);
        try {
            const data = await getMessages(receiverId);
            console.log(data)
            setMessages(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const GetParticipant = (conversation: any) => {
        const participant = conversation.participants.find((participant: any) => participant !== authUser?.userId)?.toString();
        return participant;
    }

    const SelectUser = async (userId: string) => {
        try {
            const data = await getUserInfo(userId);
            console.log(data)
            setSelectedUser(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        GetConversations();
    }, []);

    const [messageText, setMessageText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
    };

    const handleSendMessage = () => {
        if (userId) {
            sendMessage(userId, messageText);
        } else if (selectedUser.userId) {
            sendMessage(selectedUser.userId, messageText);
        } else {
            toast.error('No user selected');
        }
        
        setMessageText('');
    };

    return (
        <div className="flex">
            <div className="w-1/4">
                <div className='sidebar'>
                    {conversations
                        ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .map((conversation) => {
                            const participant = GetParticipant(conversation);
                            return (
                                <React.Fragment key={conversation._id}>
                                    <button onClick={() => { GetMessages(participant, conversation) }}>
                                        {participant}
                                    </button>
                                    <br/>
                                </React.Fragment>
                            );
                        })}
                </div>
            </div>

            <div className="w-3/4">
                <div className='main'>
                    <h1>{selectedUser?.name?.first} {selectedUser?.name?.last}</h1>
                    {messages?.map((message) => {
                        const isReceiver = message.receiverId === authUser?.userId;
                        const isSender = message.senderId === authUser?.userId;
                        const fontColor = isReceiver ? 'red' : isSender ? 'green' : 'black';
                        return (
                            <React.Fragment key={message._id}>
                                <p style={{ color: fontColor }}>{message.message}</p>
                            </React.Fragment>
                        );
                    })}
                    <input type="text" placeholder="Type a message" value={messageText} onChange={handleInputChange} />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}