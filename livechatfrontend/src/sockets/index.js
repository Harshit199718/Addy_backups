import io from "socket.io-client";
import { setChats, setMessages, setTyping, updateChat } from "../app/slices/chatSlice";
import { CHAT_CREATED, RECEIVE_MESSAGE, UPDATE_CHAT } from "./events";
import { store } from "../app/reducers";
import { getDynamicSiteName } from "../api/livechatapi";

const API_URL = "http://localhost:8080";
export let socket = null;
const defineSockets = async (token) => {
  const socketInstance = io(API_URL, {
    query: {
      token,
      "site-name": getDynamicSiteName(),
    },
  });
  socket = socketInstance;
  // Messages Sockets
  console.log("socketInstance", socketInstance);
  socketInstance.on(RECEIVE_MESSAGE, (msg) => {
    store.dispatch(setMessages({ messages: [msg] }));
  });

  socketInstance.on(CHAT_CREATED, (chat) => {
    console.log("CHAT_CREATED", chat);
    store.dispatch(setChats([chat]));
  });
  socketInstance.on(UPDATE_CHAT, (chat) => {
    console.log("socketInstance UPDATE_CHAT", chat);
    store.dispatch(updateChat(chat));
  });
  socket.on("TYPING", ({ chatId, userId }) => {
    console.log("TYPING", chatId, userId);
    store.dispatch(setTyping({ isTyping: true, chatId, userId }));
  });
  socket.on("STOP_TYPING", ({ chatId, userId }) => {
    console.log("STOP TYPING", chatId, userId);
    store.dispatch(setTyping({ isTyping: false, chatId, userId }));
  });
};

export default defineSockets;
