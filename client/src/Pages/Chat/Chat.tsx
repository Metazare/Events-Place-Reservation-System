import React from "react";
import MessageContainer from "../../Components/Messages/MessageContainer";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Chat: React.FC = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Chat;
