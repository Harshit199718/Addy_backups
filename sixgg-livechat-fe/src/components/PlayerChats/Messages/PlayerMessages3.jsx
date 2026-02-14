import React, { useCallback, useEffect, useRef, useState } from "react";
import { ImageMessage, PlayerMessagesContainer } from "./Messages.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedChat,
  selectIsSearched,
  selectMessages,
  selectShouldUpdateNext,
  selectShouldUpdatePrev,
  setIsSearched,
} from "../../../app/slices/chatSlice";
import { groupMessagesByDate } from "../messages.utils";
import { Icon } from "@iconify/react";
import { selectUser } from "../../../app/slices/userSlice";
import { useGetMessagesMutation } from "../../../api/hooks";
import Loader from "../../common/Loader";

const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;

function PlayerMessages({ previewImage, setPreviewImage }) {
  const [getMessages, { isLoading }] = useGetMessagesMutation();
  const messages = useSelector(selectMessages);
  const selectedChat = useSelector(getSelectedChat);
  const user = useSelector(selectUser);
  const shouldUpdatePrev = useSelector(selectShouldUpdatePrev);
  const shouldUpdateNext = useSelector(selectShouldUpdateNext);
  const isSearched = useSelector(selectIsSearched);
  const topRef = useRef();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [initialMessages, setInitialMessages] = useState(true);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [previousHeight, setPreviousHeight] = useState();
  const dispatch = useDispatch();
  const messagesRef = useRef(messages);
  const groupedMessagesRef = useRef({});
  messagesRef.current = messages;
  const limit = 10;
  const handleObserver = useCallback(
    (entities, direction, shouldUpdate) => {
      const target = entities[0];
      if (target.isIntersecting) {
        dispatch(setIsSearched(""));
        if (!initialMessages && shouldUpdate) {
          getMessages({
            selectedChat: selectedChat?._id,
            params: {
              lastMessageId:
                direction === "prev"
                  ? messagesRef.current[0]?._id
                  : messagesRef.current[messagesRef.current.length - 1]?._id,
              limit,
              search: isSearched,
              direction,
            },
            overide: false,
          });
        }
      }
    },
    [initialMessages, shouldUpdatePrev, shouldUpdateNext]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => handleObserver(entities, "prev", shouldUpdatePrev),
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );
    if (topRef.current) {
      observer.observe(topRef.current);
    }

    return () => {
      if (topRef.current) {
        observer.unobserve(topRef.current);
      }
    };
  }, [topRef.current, initialMessages, shouldUpdatePrev]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => handleObserver(entities, "next", shouldUpdateNext),
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef.current, initialMessages, shouldUpdateNext]);

  const chatId = selectedChat?._id;
  useEffect(() => {
    if (chatId) {
      setShowTop(false);
      setInitialMessages(false);
      getMessages({
        selectedChat: chatId,
        params: {
          lastMessageId: "",
          limit,
          search: "",
          direction: "prev",
        },
        overide: true,
      });
    }
  }, [chatId]);

  useEffect(() => {
    if (messages?.length) {
      const convertedMessages = groupMessagesByDate(messages);
      setGroupedMessages(convertedMessages);
      setShowTop(true);
    } else {
      setGroupedMessages([]);
    }
  }, [messages]);

  useEffect(() => {
    if (!groupedMessages?.length || isSearched) {
      return;
    }
    if (groupedMessages?.length && messages?.length <= limit) {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        setPreviousHeight(containerRef.current.scrollHeight);
      }
    } else {
      if (containerRef.current) {
        setTimeout(() => {
          const newHeight = containerRef.current.scrollHeight;
          setPreviousHeight(newHeight);
          containerRef.current.scrollTop += newHeight - previousHeight;
        }, 0);
      }
    }
  }, [groupedMessages]);

  useEffect(() => {
    if (isSearched) {
      setTimeout(() => {
        let key = ""
        groupedMessages?.forEach((group, index) => {
          group.messages.forEach((message, index2) => {
            if (message.message?.toLowerCase()?.includes(isSearched?.toLowerCase())) {
              key = `group_${index}_message_${index2}`
            }
          })
        })
        if (key) {
          groupedMessagesRef.current[key]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
    }
  }, [groupedMessages, isSearched])
  

  // useEffect(() => {
  //   if (isSearched) {
  //     const element = document.getElementById("searched-message");
  //     console.log("isSearched", isSearched, element);
  //     if (element) {
  //       element.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  // }, [groupedMessages, isSearched]);

  return (
    <PlayerMessagesContainer
      ref={containerRef}
      $direction="column"
      $alignItems="start"
      $justifyContent="start"
      $previewImage={previewImage}
    >
      {isLoading && <Loader />}
      {showTop ? <div ref={topRef} /> : null}
      {previewImage ? (
        <ImageMessage $previewImage>
          <div className="icons_container">
            <a href={previewImage} download target="_blank">
              <Icon fontSize={22} icon="material-symbols:download" />
            </a>
            <Icon
              fontSize={22}
              icon="material-symbols:close"
              onClick={() => {
                setPreviewImage(null);
              }}
            />
          </div>
          <div className="img_container">
            <img src={previewImage} />
          </div>
        </ImageMessage>
      ) : (
        groupedMessages?.map((group, index) => (
          <>
            <h5 className="group-title">{group.title}</h5>
            {group?.messages?.map((message, index2) => {
              return message.type === "image" ? (
                <ImageMessage
                  key={message?._id}
                  className={`message ${
                    message.sender === user?._id ? "self" : ""
                  }`}
                  onClick={() => {
                    setPreviewImage(
                      `${LIVECHAT_API_URL}/uploads/${message.message}`
                    );
                  }}
                >
                  <div className="img_container">
                    <img
                      src={`${LIVECHAT_API_URL}/uploads/${message.message}`}
                    />
                  </div>
                </ImageMessage>
              ) : (
                <span
                ref={ref=> groupedMessagesRef.current[`group_${index}_message_${index2}`] = ref}
                  key={message?._id}
                  // ref={message.message.toLowerCase()?.includes(isSearched?.toLowerCase())?searchedRef:null}
                  className={`message ${
                    message.sender === user?._id ? "self" : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: `${message.message}
                            <span class="time">${message.time}</span>`,
                  }}
                />
              );
            })}
          </>
        ))
      )}
      {showTop ? <div ref={bottomRef} /> : null}
    </PlayerMessagesContainer>
  );
}

export default PlayerMessages;
