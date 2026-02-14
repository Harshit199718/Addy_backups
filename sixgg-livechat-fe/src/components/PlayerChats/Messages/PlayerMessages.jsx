import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AllMessages,
  AllMessagesWrapper,
  UserMessage,
} from "./Messages.styled";
import { useGetMessagesMutation } from "../../../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedChat,
  selectIsSearched,
  selectMessages,
  selectReceivedMessageFrom,
  setIsSearched,
  setMessages,
  setReceivedMessageFrom,
} from "../../../app/slices/chatSlice";
import { selectUser } from "../../../app/slices/userSlice";
import Message from "./Message";
import DownloadImage from "./DownloadImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { groupMessagesByDate } from "../messages.utils";
import { socket } from "../../../sockets";
import { MARK_READ } from "../../../sockets/events";

function PlayerMessages({ previewImage, setPreviewImage, setImage }) {
  const [getMessages, { isLoading }] = useGetMessagesMutation();
  const selectedChat = useSelector(getSelectedChat);
  const user = useSelector(selectUser);
  const isSearched = useSelector(selectIsSearched);
  const messages = useSelector(selectMessages);
  const receivedMessageFrom = useSelector(selectReceivedMessageFrom);
  const [lastMessageId, setLastMessageId] = useState();
  const [direction, setDirection] = useState("prev");
  const [initialMessages, setInitialMessages] = useState(true);
  const [isNewChatId, setIsNewChatId] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fetchPrev, setFetchPrev] = useState(true);
  const [fetchNext, setFetchNext] = useState(false);
  const [scrollToSearch, setScrollToSearch] = useState(false);
  const [afterSearch, setAfterSearch] = useState(false);
  const containerRef = useRef();
  const searchRef = useRef();
  const [previousHeight, setPreviousHeight] = useState();
  const dispatch = useDispatch();

  const getAllMessages = async (id, direction, search, isInitial, from) => {
    const result = await getMessages({
      selectedChat: id,
      params: {
        lastMessageId: search
          ? ""
          : afterSearch
          ? messages?.length >= 10 && direction === "prev"
            ? messages[0]?._id
            : messages[messages?.length - 1]?._id
          : lastMessageId,
        direction,
        limit: 10,
        search: search ? search : "",
      },
    }).unwrap();
    const allMessages = result.data;
    let lastId = allMessages[0]?._id;
    if (direction === "next") {
      lastId = allMessages[allMessages.length - 1]?._id;
      if (messages?.length >= 10) {
      }
    }
    if (search) {
      dispatch(
        setMessages({
          messages: allMessages,
        })
      );
      setFetchPrev(true);
      setFetchNext(true);
      setAfterSearch(true);
    } else if (isInitial) {
      dispatch(
        setMessages({
          messages: allMessages,
        })
      );
    } else if (direction === "prev") {
      dispatch(
        setMessages({
          messages: allMessages,
          addCase: "prepend",
        })
      );
      if (allMessages.length < 10) {
        setFetchPrev(false);
      }
    } else {
      dispatch(
        setMessages({
          messages: allMessages,
          addCase: "append",
        })
      );
      if (allMessages.length < 10) {
        setFetchNext(false);
      }
    }
    setLastMessageId(lastId);
  };

  const chatId = selectedChat?._id;
  useEffect(() => {
    if (chatId) {
      setInitialMessages(true)
      setIsNewChatId(true)
      getAllMessages(chatId, "prev", "", true, "chatId");
    }
    if (chatId && (user?.role=="agent" || user?.role=="admin")) {
      console.log("from effect", socket)
      socket.emit(MARK_READ, chatId)
    }
  }, [chatId, user]);
  useEffect(() => {
    if (receivedMessageFrom && (user?.role=="agent" || user?.role=="admin")) {
      socket.emit(MARK_READ, receivedMessageFrom)
      dispatch(setReceivedMessageFrom(""))
    }
  }, [receivedMessageFrom, socket])
  

  const messagesLength = messages?.length;

  useEffect(() => {
    if (messagesLength && !afterSearch) {
      if (initialMessages) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        setPreviousHeight(containerRef.current.scrollHeight);
        if (!isNewChatId) {
          setTimeout(() => {
            setInitialMessages(false);
          }, 0);
        }
      } else {
        const newHeight = containerRef.current.scrollHeight;
        setPreviousHeight(newHeight);
        containerRef.current.scrollTop += newHeight - previousHeight;
      }
    }
  }, [messagesLength, isNewChatId, initialMessages]);
  useEffect(() => {
    if (isSearched) {
      setSearchText(isSearched);
      setInitialMessages(true)
      setTimeout(() => {
        setInitialMessages(false);
      }, 500);
      getAllMessages(chatId, "prev", isSearched, false, "isSearched");
      setFetchNext(true);
    }
  }, [isSearched]);

  useEffect(() => {
    if (scrollToSearch) {
      setScrollToSearch(false);
      dispatch(setIsSearched(""));
      setInitialMessages(false)
      searchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollToSearch]);

  const groupedMessages = useMemo(() => {
    setTimeout(() => {
      setIsNewChatId(false)
    }, 500);
    return messages?.length ? groupMessagesByDate(messages) : [];
  }, [messages]);
  const fetchMoreMessage = async (direction) => {
    if (
      !initialMessages && !isNewChatId &&
      ((direction === "prev" && fetchPrev) ||
        (direction === "next" && fetchNext))
    ) {
      console.log("from fetch", initialMessages)
      getAllMessages(selectedChat?._id, direction, "", false, "fetchMore");
    }
  };

  return (
    <AllMessagesWrapper>
      {previewImage ? (
        <div className="preview-img">
          <img src={previewImage} alt="" />
          <div className="icons_container">
            <DownloadImage imageUrl={previewImage} />
            <Icon
              fontSize={22}
              color="#fff"
              icon="material-symbols:close"
              onClick={() => {
                setPreviewImage(null);
                setImage(null)
              }}
            />
          </div>
        </div>
      ) : null}
      <AllMessages
        ref={containerRef}
        onScroll={(event) => {
          console.log("initialMessages", initialMessages)
          const target = event.target;
          if (target.scrollTop === 0) {
            fetchMoreMessage("prev");
          } else if (
            target.scrollTop + target.clientHeight ===
            target.scrollHeight
          ) {
            fetchMoreMessage("next");
            // Here you can trigger loading next set of messages or any other action
          }
        }}
      >
        {groupedMessages?.map((group) => {
          return (
            <>
              <h5 className="group-title">{group.title}</h5>
              {group.messages?.map((message) => {
                return (
                  <Message
                    message={message}
                    setScrollToSearch={setScrollToSearch}
                    searchRef={searchRef}
                    setPreviewImage={setPreviewImage}
                    searchText={searchText}
                  />
                );
              })}
            </>
          );
        })}
      </AllMessages>
    </AllMessagesWrapper>
  );
}

export default PlayerMessages;
