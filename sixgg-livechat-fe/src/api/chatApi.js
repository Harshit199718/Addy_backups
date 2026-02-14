import { setChats, setMessages, setSearchedChats } from "../app/slices/chatSlice";
import { livechatapi } from "./livechatapi";

export const chatApi = livechatapi.injectEndpoints({
  reducerPath: "chatApi",
  endpoints: (builder) => ({
    // chats
    getAllChats: builder.mutation({
      query: ({lastChatId, site}) => `/chat/all/?lastChatId=${lastChatId?lastChatId:""}${site?`&site=${site}`:''}`,
      providesTags: ["Chats"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setChats({allChats: data.data, lastChatId: arg.lastChatId, noMoreChats: data.data?.length<8}));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // search chats
    searchChats: builder.mutation({
      query: (search) => `/chat/search/?search=${search}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSearchedChats(data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // Selected Chat Messages
    getMessages: builder.mutation({
      query: ({ selectedChat, params }) =>
        `/message/all/${selectedChat}/?lastMessageId=${params.lastMessageId}&limit=${params.limit}&search=${params.search}&direction=${params.direction}`,
    }),
    getChatDetails: builder.query({
      query: (id) => ({
        url: `/chat/${id}/`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getChatWithUsername: builder.mutation({
      query: ({username, site}) => ({
        url: `/chat/username/?username=${username}&site=${site}`,
        method: "GET",
      }),
    }),
  }),
});
