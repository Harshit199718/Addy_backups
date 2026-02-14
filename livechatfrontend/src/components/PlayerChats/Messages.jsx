import { useEffect, useRef, useState } from "react";
import {
  BlockMsg,
  MessageHeader,
  MessageInputContainer,
  MessagesContainer,
  PlayerMessages,
} from "./PlayerChats.styled";
import { useSelector } from "react-redux";
import {
  getSelectedChat,
  selectChats,
  selectMessages,
} from "../../app/slices/chatSlice";
import { useGetMessagesMutation } from "../../api/hooks";
import { socket } from "../../sockets";
import { NEW_MESSAGE } from "../../sockets/events";
import sendIcon from "../../assets/icons/send-icon.png";
import { Icon } from "@iconify/react";
import { selectUser } from "../../app/slices/userSlice";

function Messages() {
  const user = useSelector(selectUser);
  const selectedChat = useSelector(getSelectedChat);
  const [getMessages] = useGetMessagesMutation();
  const messages = useSelector(selectMessages);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const chats = useSelector(selectChats);
  const [username, setUsername] = useState("Agent");
  const [groupedMessages, setGroupedMessages] = useState([])

  function groupMessagesByDate(messages) {
    // Function to format the date
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
  
    // Function to format the time
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    };
  
    // Reduce the array into an object grouped by date
    const grouped = messages.reduce((acc, message) => {
      const dateKey = formatDate(message.createdAt);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        ...message,
        time: formatTime(message.createdAt), // Add formatted time to each message
      });
      return acc;
    }, {});
  
    // Convert the object back to an array with title for easier use in React
    return Object.entries(grouped).map(([date, messages]) => ({
      title: date,
      messages
    }));
  }
  useEffect(() => {
    // Scroll the container div to the bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    if (messages) {
      const convertedMessages = groupMessagesByDate(messages);
      // console.log("groupedMessages", groupedMessages);
      setGroupedMessages(convertedMessages)
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat?._id);
      const chat = chats.find((chat) => chat._id === selectedChat?._id);
      setUsername(chat?.user?.username);
    }
  }, [selectedChat]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      socket.emit("STOP_TYPING", {
        chatId: selectedChat?._id,
        userId: user?._id,
      });
    }, 2000); // Delay in milliseconds

    // Cleanup timeout on component unmount or query change
    return () => clearTimeout(timerId);
  }, [message]);
  console.log("selectedChat", selectedChat);
  const sendMessage = () => {
    if (message) {
      socket.emit(NEW_MESSAGE, {
        chatId: selectedChat?._id,
        senderId: user?._id,
        message,
      });
      setMessage("");
    }
  };
  return (
    <MessagesContainer>
      {selectedChat ? (
        <>
          <MessageHeader>
            <Icon icon="carbon:user-avatar-filled" color="#fff" fontSize={40} />
            <h2 className="username">
              {username} 
              {
                selectedChat?.actives?.includes(selectedChat?.user?._id)?
                <div className="online" />
                :null
              }
            </h2>
            {selectedChat?.typing?.isTyping ? <span>typing...</span> : null}
          </MessageHeader>
          <PlayerMessages
            ref={containerRef}
            $direction="column"
            $alignItems="start"
            $justifyContent="start"
          >
            {
              groupedMessages?.map(group => (
                <>
                  <h5 className="group-title">{group.title}</h5>
                  {group?.messages?.map((message) => (
                    <span
                      className={`message ${message.sender === user?._id ? "self" : ""}`}
                    >
                      {message.message} <span className="time">{message.time}</span>
                    </span>
                  ))}
                </>
              ))
            }
          </PlayerMessages>
          {!user?.block ? (
            <MessageInputContainer>
              <input
                type="text"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  socket.emit("TYPING", {
                    chatId: selectedChat?._id,
                    userId: user?._id,
                  });
                }}
              />
              <img src={sendIcon} alt="" onClick={sendMessage} />
            </MessageInputContainer>
          ) : (
            <BlockMsg>You have been blocked by Admin</BlockMsg>
          )}
        </>
      ) : (
        <BlockMsg>Select a Conversation to Start Chat</BlockMsg>
      )}
    </MessagesContainer>
  );
}

export default Messages;
