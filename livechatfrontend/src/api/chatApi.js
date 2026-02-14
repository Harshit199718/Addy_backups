import { setChats, setMessages } from "../app/slices/chatSlice";
import { livechatapi } from "./livechatapi";


export const chatApi = livechatapi.injectEndpoints({
  reducerPath: "chatApi",
  endpoints: (builder) => ({
    // chats
    getAllChats: builder.query({
      query: (agentId) => `/chat/all/${agentId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          console.log("data.messages", data)
          dispatch(setChats(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    // Selected Chat Messages
    getMessages: builder.mutation({
      query: (selectedChat) => `/message/all/${selectedChat}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          console.log("data.messages", data)
          dispatch(setMessages({messages: data.data, overide: true}))
        } catch (error) {
          console.log(error)
        }
      }
    }),
  }),
});