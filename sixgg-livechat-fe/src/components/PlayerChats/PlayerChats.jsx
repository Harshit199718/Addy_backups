import {
  BlockMsg,
  ChatHeader,
  PlayerChat,
  PlayerChatsContainer,
} from "./PlayerChats.styled";
import { useGetAllChatsMutation, useGetUserDetailsQuery, useSearchChatsMutation } from "../../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedChat,
  getSelectedSite,
  selectChats,
  selectNoMoreChats,
  selectSearchedChats,
  selectTypingDetails,
  setSearchedChats,
  setSelectedChat,
} from "../../app/slices/chatSlice";
import { socket } from "../../sockets";
import { MARK_READ } from "../../sockets/events";
import { selectUser } from "../../app/slices/userSlice";
import { Box } from "../common/Box";
import { SearchInput } from "./Messages/Messages.styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../common/Button";
import { formatMessageDate, getFilterStyles } from "../../utlis";
import Loader from "../common/Loader";
import LoadingMore from "./LoadingMore";

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
function PlayerChats() {
  const [username, setUsername] = useState("");
  const [loadingChats, setLoadingChats] = useState(false)
  const user = useSelector(selectUser);
  const [getAllChats, {isSuccess, error}] = useGetAllChatsMutation(user?._id, {
    skip: !user?._id,
  });
  const [searchChats] = useSearchChatsMutation();
  const selectedChat = useSelector(getSelectedChat);
  const chats = useSelector(selectChats);
  const searchedChats = useSelector(selectSearchedChats);
  const selectedSite = useSelector(getSelectedSite);
  const typingDetails = useSelector(selectTypingDetails);
  const noMoreChats = useSelector(selectNoMoreChats);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (user && selectedSite) {
      console.log("getAllChats", selectedSite)
      getAllChats(selectedSite==="All"?{}:{site: selectedSite})
    }
  }, [user, selectedSite])

  useEffect(() => {
    if (chats) {
      setLoadingChats(false)
    }
  }, [chats])
  
  
  const selectChat = (chat) => {
    dispatch(setSelectedChat(chat));
    socket.emit("JOIN_CHAT", { chatId: chat?._id });
  };
  const filteredChats = chats
    ?.filter((chat) => (selectedFilter === "Unread" ? chat.unreadCount : true))
    ?.filter((chat) =>
      selectedSite === "All" ? true : chat.site === selectedSite
    )
  const unreadCount = chats
    ?.filter((chat) => chat.unreadCount)
    ?.filter((chat) =>
      selectedSite === "All" ? true : chat.site === selectedSite
    )?.length;
    
  useEffect(() => {
    window?.parent?.postMessage({
      type: "Unread",
      unreadCount
    }, "*");
  }, [unreadCount])

  const allChats = useMemo(() => {
    console.log("searchedChats", searchedChats[0], filteredChats[1])
    if (query || searchedChats?.length) {
      return searchedChats
    }
    return filteredChats
  }, [filteredChats, searchedChats])
  
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        searchChats(query);
      }
    }, 500),
    []
  );

  useEffect(() => {
    query?debouncedSearch(query):dispatch(setSearchedChats([]))
  }, [query])
  
  return (
    <PlayerChatsContainer $direction="column" $justifyContent="flex-start" onScroll={event => {
      if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
        setLoadingChats(true)
        getAllChats(selectedSite==="All"?{lastChatId: chats[chats?.length - 1]?._id}:{site: selectedSite, lastChatId: chats[chats?.length - 1]?._id})
        // Perform the action you want to take when scrolled to the bottom
      }
    }}>
      {((user?.role === "agent") || (user?.role === "admin")) ? (
        <ChatHeader>
          <input
            placeholder="Search Coversation"
            style={{ border: "1px solid #000" }}
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Box
            $spacingX="0"
            $spacingY="0"
            $justifyContent="flex-start"
            $gap="10px"
          >
            {["All", "Unread"]?.map((filter) => (
              <Button
                $fontSize="1em"
                {...getFilterStyles(selectedFilter, filter)}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}{" "}
                {
                  filter==="Unread" && unreadCount?
                  <span className="count">{unreadCount}</span>
                  :null
                }
              </Button>
            ))}
          </Box>
        </ChatHeader>
      ) : null}
      {allChats?.length ? (
        allChats?.map((chat) => (
          <PlayerChat
            key={chat._id}
            $selected={selectedChat?._id === chat._id}
            $direction="column"
            $alignItems="start"
            onClick={() => {
              selectChat(chat);
              // socket.emit(MARK_READ, chat?._id)
            }}
          >
            <span className="username">
              <span className="user" title={chat?.user?.username}>
                {chat?.user?.username}{" "}
              </span>
              <span className="time">
                {chat?.lastMessageTime
                  ? formatMessageDate(chat.lastMessageTime)
                  : ""}
              </span>
            </span>
            <Box
              className="chat-details"
              style={{ width: "100%" }}
              $spacingX="0"
              $spacingY="0"
            >
              {}
              <span
                className="last-message"
                dangerouslySetInnerHTML={{
                  __html:
                  chat?.typing?"<span class='typing'>typing...</span>":chat?.lastMessage ||
                    `Start conversation with ${chat?.user?.username}`,
                }}
              />
              {chat?.unreadCount && chat?.lastSender !== user?._id ? (
                <span className="count">{chat?.unreadCount}</span>
              ) : null}
            </Box>
          </PlayerChat>
        ))
      ) : (
        <BlockMsg>No Chats</BlockMsg>
      )}
      {
        noMoreChats && allChats?.length?
        <BlockMsg style={{marginTop: "10px"}}>No More Chats</BlockMsg>
        :
        loadingChats?
        <LoadingMore />
        :null
      }
    </PlayerChatsContainer>
  );
}

export default PlayerChats;
