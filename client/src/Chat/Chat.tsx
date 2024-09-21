import React, { useEffect, useState } from "react";
import Header from "src/Layouts/Header/Header";
import Avatar from "@mui/material/Avatar";
import GoBackComp from "src/Components/GoBackComp";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import { useFormik } from "formik";

import useChat from "src/Hooks/useChat";
import { useAuthContext } from "src/Context/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Chat() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser } = useAuthContext();
    const {
        conversations,
        getConversations,
        messages,
        getMessages,
        setMessages,
        sendMessage,
        useListenMessages,
        selectedUser,
        SelectUser,
    } = useChat();

    useEffect(() => {
        getConversations();

        if (id) {
            getMessages(id);
            SelectUser(id);
        }
    }, []);

    const handleSelectConversation = (
        receiverId: string,
        conversation: any
    ) => {
        SelectUser(receiverId);
        getMessages(receiverId);
        navigate(`/chat/${receiverId}`);
    };

    const handleSendMessage = (messageText) => {
        if (id) {
            sendMessage(id, messageText, authUser?.userId || "");
        } else if (selectedUser?.userId) {
            sendMessage(
                selectedUser?.userId,
                messageText,
                authUser?.userId || ""
            );
        } else {
            toast.error("No user selected");
        }
    };

    useListenMessages(setMessages);

    const ChatFormik = useFormik({
        initialValues: {
            message: "",
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};
            if (!values.message) {
                errors.message = "Message is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            handleSendMessage(values.message);
            ChatFormik.setFieldValue("message", "");
        },
    });
    return (
        <>
            <div className="flex flex-col min-h-[100vh] h-[100vh%] ">
                <div className="grow bg-[white] grid grid-cols-ChatMD md:grid-cols-ChatLG">
                    <div className="bg-[#E9E9E9]  h-[100%] flex flex-col">
                        <div className="px-5 py-3">
                            <div className="md:hidden">
                                <Tooltip title="Go Back">
                                    <IconButton
                                        aria-label=""
                                        onClick={() => {}}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <p className="text-[20px] font-semibold hidden md:block mt-1 ">
                                My Messages
                            </p>
                        </div>
                        <div className="flex flex-col mt-4 grow max-h-custom overflow-hidden ">
                            {conversations?.map((conversation) => {
                                return (
                                    <ChatMenu
                                        id={conversation._id}
                                        name={
                                            conversation.participant.name
                                                .first +
                                            " " +
                                            conversation.participant.name.last
                                        }
                                        message={
                                            // conversation.participant.name.first
                                            ""
                                        }
                                        img={conversation.participant.photo}
                                        onClick={() => {
                                            handleSelectConversation(
                                                conversation.participant.userId,
                                                conversation
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col grow">
                        <div className="p-3">
                            <p className="p-3 text-[20px] font-medium text-[black]/80">
                                {selectedUser?.name?.first}{" "}
                                {selectedUser?.name?.last}
                            </p>
                        </div>
                        <div className="p-3 grow border-y-2 border-[black]/10">
                            {messages?.map((message) => {
                                const isSender =
                                    message.senderId === authUser?.userId;
                                return (
                                    <MessageBubble
                                        isSender={isSender}
                                        message={message.message}
                                        image={selectedUser?.photo}
                                    />
                                );
                            })}
                        </div>
                        <div className="p-3 flex gap-2">
                            <input
                                type="text"
                                className="w-full border border-[black]/10 p-2 rounded-xl"
                                placeholder="Type a message"
                                name="message"
                                value={ChatFormik.values.message}
                                onChange={ChatFormik.handleChange}
                                disabled={!selectedUser}
                            />
                            <IconButton
                                aria-label=""
                                onClick={() => {
                                    ChatFormik.handleSubmit();
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function MessageBubble({ isSender, message, image }) {
    return (
        <>
            <div
                className={`flex items-center gap-3 ${
                    isSender && "justify-end"
                }`}
            >
                {!isSender && (
                    <Avatar
                        src={image}
                        sx={{ width: "30px", height: "30px" }}
                    />
                )}
                <p className="text-[14px] text-[black]/60 bg-[#D9D9D9] py-1 px-2 rounded-xl">
                    {message}
                </p>
            </div>
        </>
    );
}
function ChatMenu({ id, name, message, img, onClick }) {
    return (
        <>
            <Tooltip title={name} onClick={onClick}>
                <div
                    className={`px-5 py-3  flex gap-2 items-center cursor-pointer hover:bg-[#D9D9D9]`}
                    style={{ transition: "all .3s ease-in-out" }}
                >
                    <Avatar
                        variant="circular"
                        src={img}
                        alt={name}
                        sx={{ width: "40px", height: "40px" }}
                    />
                    <div className=" flex-col grow  w-full  max-w-[220px] hidden md:flex">
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[13px] w-full">
                            {name}
                        </p>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[12px]  w-full opacity-80 max-w-[80%]">
                            {message}
                        </p>
                    </div>
                </div>
            </Tooltip>
        </>
    );
}
