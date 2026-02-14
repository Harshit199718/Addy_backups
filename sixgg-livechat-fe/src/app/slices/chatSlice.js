import { createSlice } from "@reduxjs/toolkit";

function sortChats(chats) {
  return chats.sort((a, b) => {
    const aTime = new Date(a.lastMessageTime);
    const bTime = new Date(b.lastMessageTime);

    return bTime - aTime; // Sort in descending order
});
}
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    searchedChats: [],
    messages: [],
    selectedChat: "",
    shouldUpdatePrev: true,
    shouldUpdateNext: true,
    isSearched: "",
    sitesFilter: [],
    selectedSite: "All",
    receivedMessageFrom: "",
    typingDetails: [],
    noMoreChats: false
  },
  reducers: {
    setChats(state, action) {
      state.noMoreChats = action.payload.noMoreChats
      if (!action.payload.lastChatId) {
        // Initialize state.chats with allChats from payload
        state.chats = action.payload.allChats;
      } else {
        // Concatenate existing chats with new ones and filter out duplicates
        const existingChatIds = new Set(state.chats.map(chat => chat._id));
        const newChats = action.payload.allChats.filter(chat => !existingChatIds.has(chat._id));
        state.chats = sortChats([...state.chats, ...newChats]);
      }
      const allSites = state.chats?.map((chat) => chat.site);
      const filteredSites = [...new Set(allSites)];
      state.sitesFilter = filteredSites;
    },
    setSearchedChats(state, action) {
      state.searchedChats = action.payload;
    },
    setSelectedSite (state, action) {
      state.selectedSite = action.payload;
    },
    removeChats(state, action) {
      state.chats = [];
    },
    updateChat(state, action) {
      const {chat, isNewMessage} = action.payload;
      const filteredChats = state.chats.filter((ch) => (chat._id === ch._id))
      if (!filteredChats?.length && isNewMessage) {
        state.chats = [chat, ...state.chats]
      }
      state.chats = sortChats(state.chats.map((ch) => (chat._id === ch._id ? chat : ch)));
      if (state.searchedChats?.length) {
        state.searchedChats = sortChats(state.searchedChats.map((ch) => (chat._id === ch._id ? chat : ch)));
      }
      if (state.selectedChat?._id === chat._id) {
        state.selectedChat.actives = chat.actives;
      }
    },
    removeChat(state, action) {
      state.chats = state?.chats?.filter(
        (chat) => chat._id !== action.payload?._id
      );
    },
    setIsSearched(state, action) {
      state.isSearched = action.payload;
    },
    setMessages(state, action) {
      const { messages, addCase, onNewMessage } = action.payload;
      if (addCase === "prepend") {
        state.messages = [...messages, ...state.messages];
      } else if (addCase === "append") {
        state.messages = [...state.messages, ...messages];
      } else {
        state.messages = messages;
      }
      if (onNewMessage && state.selectedChat?._id === messages[0]?.chatId) {
        state.receivedMessageFrom = messages[0]?.chatId;
      }
    },
    setReceivedMessageFrom (state, action) {
      state.receivedMessageFrom = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    setTyping(state, action) {
      if (action.payload.chatId === state.selectedChat?._id) {
        state.selectedChat = { ...state.selectedChat, typing: action.payload };
      }
      state.chats = state.chats.map((ch) => (action.payload.chatId === ch._id ? {...ch, typing: action.payload.isTyping} : ch));
    },
  },
});

export const selectNoMoreChats = (state) => state.chat.noMoreChats;
export const selectReceivedMessageFrom = (state) => state.chat.receivedMessageFrom;
export const getSelectedSite = (state) => state.chat.selectedSite;
export const selectSitesFilter = (state) => state.chat.sitesFilter;
export const selectMessages = (state) => state.chat.messages;
export const selectShouldUpdatePrev = (state) => state.chat.shouldUpdatePrev;
export const selectShouldUpdateNext = (state) => state.chat.shouldUpdateNext;
export const selectChats = (state) => state.chat.chats;
export const selectSearchedChats = (state) => state.chat.searchedChats;
export const getSelectedChat = (state) => state.chat.selectedChat;
export const selectTypingDetails = (state) => state.chat.typingDetails;
export const selectIsSearched = (state) => state.chat.isSearched;

export const {
  setChats,
  setSearchedChats,
  removeChats,
  setTyping,
  updateChat,
  setMessages,
  setSelectedChat,
  removeChat,
  setIsSearched,
  setSelectedSite,
  setReceivedMessageFrom
} = chatSlice.actions;

export default chatSlice.reducer;
