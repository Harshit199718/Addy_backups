import { PlayerChat, PlayerChatsContainer } from "./PlayerChats.styled";
import { useGetAllChatsQuery, useGetUserDetailsQuery } from "../../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedChat,
  selectChats,
  setSelectedChat,
} from "../../app/slices/chatSlice";
import { socket } from "../../sockets";
import { MARK_READ } from "../../sockets/events";
import { useEffect } from "react";
import { selectUser } from "../../app/slices/userSlice";

function PlayerChats() {
  const user = useSelector(selectUser);
  useGetAllChatsQuery(user?._id, {
    skip: !user?._id,
  });
  const selectedChat = useSelector(getSelectedChat);
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  const selectChat = (chat) => {
    dispatch(setSelectedChat(chat));
    socket.emit("JOIN_CHAT", { chatId: chat?._id });
  };
  return (
    <PlayerChatsContainer $direction="column" $justifyContent="flex-start">
      {chats?.map((chat) => (
        <PlayerChat
          key={chat._id}
          $selected={selectedChat?._id === chat._id}
          $direction="column"
          $alignItems="start"
          onClick={() => {
            selectChat(chat);
            socket.emit(MARK_READ, chat?._id)
          }}
        >
          <span className="username">
            {chat?.user?.username}{" "}
            {
              chat?.unreadCount && (chat?.lastSender!==user?._id)?
              <span className="count">{chat?.unreadCount}</span>
              :null
            }
          </span>
          <span className="last-message">{chat?.lastMessage || `Start conversation with ${chat?.user?.username}`}</span>
        </PlayerChat>
      ))}
    </PlayerChatsContainer>
  );
}

export default PlayerChats;
