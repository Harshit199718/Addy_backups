import io from "socket.io-client";
import { setChats, setMessages, setTyping, updateChat } from "../app/slices/chatSlice";
import { CHAT_CREATED, RECEIVE_MESSAGE, UPDATE_CHAT } from "./events";
import { store } from "../app/livechatStore";
import messageSound from "../assets/sounds/message.mp3"
import boMessageSound from "../assets/sounds/bo-message.mp3"
import { getInstanceToken } from "../api/livechatapi";

const API_URL = process.env.REACT_APP_LIVECHAT_API_URL;
const boAudio = new Audio(boMessageSound);
export let socket = null;
const defineSockets = async (token, siteName, isAgent, socketChanged, userId) => {
  let attempts = 0
  const socketInstance = io(API_URL, {
    reconnection: false,
    query: {
      token,
      "site-name": siteName,
      "instance-token": getInstanceToken()
    },
    transports: ["websocket"]
  });
  socket = socketInstance;
  // Messages Sockets
  const tryReconnect = () => {
    console.log("reconnecting")
    setTimeout(() => {
      socketInstance.io.open((err) => {
        if (err) {
          tryReconnect();
        }
      });
    }, 2000);
  }
  socketInstance.io.on("close", tryReconnect);
  socketInstance.on(RECEIVE_MESSAGE, (msg) => {
    console.log("RECEIVE_MESSAGE ", msg, userId)
    store.dispatch(setMessages({ messages: [msg], addCase: "append", onNewMessage: true }));
    if ((userId!==msg.sender?._id) && !isAgent) {
      const audio = new Audio(messageSound);
      audio.play();
    }
  });

  socketInstance.on(CHAT_CREATED, (chat) => {
    store.dispatch(setChats({allChats: [chat], lastChatId: true}));
  });
  socketInstance.on(UPDATE_CHAT, (chat, isNewMessage) => {
    console.log("updating chat for: ", chat._id, isNewMessage)
    store.dispatch(updateChat({chat, isNewMessage}));
    if (isNewMessage) {
      boAudio.play();
    }
    window?.parent?.postMessage({
      unreadCount: chat.unreadCount
    }, "*");
  });
  socketInstance.on("TYPING", ({ chatId, userId }) => {
    console.log("Typing", chatId, userId)
    store.dispatch(setTyping({ isTyping: true, chatId, userId }));
  });

  socketInstance.on("STOP_TYPING", ({ chatId, userId }) => {
    console.log("Typing STOP_TYPING", chatId, userId)
    store.dispatch(setTyping({ isTyping: false, chatId, userId }));
  });

  socketInstance.on("CONNECTED", (id) => {
    console.log("CONNECTED", id);
    attempts++;
    socketChanged()
  });
  socketInstance.on("reconnect_attempt", (id) => {
    console.log("reconnect attempt");
    // socketInstance.emit("JOIN_CHAT", { chatId: chat?._id });
  });
  socketInstance.on("reconnect", (id) => {
    console.log("reconnect");
    // socketInstance.emit("JOIN_CHAT", { chatId: chat?._id });
  });

  // socketInstance.on('disconnect', (reason) => {
  //   console.warn('Disconnected FE:', reason);
  //   socketInstance.connect();
  // });

};

export default defineSockets;
