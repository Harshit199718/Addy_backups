import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    selectedChat: "",
  },
  reducers: {
    setChats(state, action){
      state.chats = [...state.chats, ...action.payload]
    },
    updateChat(state, action){
      const chat = action.payload;
      state.chats = state.chats.map(ch => chat._id===ch._id?chat:ch)
      if (state.selectedChat?._id === chat._id) {
        state.selectedChat.actives = chat.actives
      }
    },
    setMessages(state, action){
      if (action.payload.overide) {
        state.messages = action.payload.messages
      } else {
        state.messages = [...state.messages, ...action.payload.messages]
      }
    },
    setSelectedChat(state, action){
      state.selectedChat = action.payload
    },
    setTyping(state, action) {
      if (action.payload.chatId === state.selectedChat?._id) {
        state.selectedChat = {...state.selectedChat, typing: action.payload}
      }
    },
  },
});

export const selectMessages = state => state.chat.messages
export const selectChats = state => state.chat.chats
export const getSelectedChat = state => state.chat.selectedChat

export const {setChats, setTyping, updateChat, setMessages, setSelectedChat} = chatSlice.actions;

export default chatSlice.reducer;
