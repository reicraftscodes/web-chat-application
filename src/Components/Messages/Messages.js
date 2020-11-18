import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";
import style from "./Messages.module.scss";

const Messages = ({ username }) => {
	const socketRef = useRef();
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		socketRef.current = socket;
		socketRef.current.on("message", (data) => {
			setMessages((messages) => [...messages, data]);
		});
	}, []);

	return (
		<div className={style.MainDiv}>
			<h3 className="font-weight-bold">Chat Messages</h3>
			<div
				id="messagetext"
				className={`mt-3 ${style.messagesContainer} container-fluid`}
			>
				{messages.map((message) => {
					return (
						<>
							<p
								key={Math.random()}
								className={
									message.data.username === username
										? style.messageOwner
										: style.messageReceiver
								}
							>
								{message.data.username === username
									? "You:"
									: message.data.username + ":"}
								<p>
									{message.data.message} on {message.data.time}
								</p>
							</p>
						</>
					);
				})}
			</div>
		</div>
	);
};
export default Messages;
