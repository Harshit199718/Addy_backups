import { removeChat } from "../app/slices/chatSlice";
import { setAgents, setUser, setUserAuth, setUsers, updateUser } from "../app/slices/userSlice";
import { livechatapi } from "./livechatapi";

export const userApi = livechatapi.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    // Add user and login
    addUserAndLogin: builder.mutation({
      query: (payload) => ({
        url: "/auth/adduser_and_login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Settings", "Chats"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          localStorage.setItem("livechat_user", JSON.stringify(data))
          dispatch(setUserAuth(data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `/user/profile/`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getUsers: builder.mutation({
      query: ({token, lastUserId}) => ({
        url: `/user/all/?lastUserId=${lastUserId?lastUserId:""}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setUsers(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getAgents: builder.mutation({
      query: (department) => `/user/agents/${department}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setAgents(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    blockUser: builder.mutation({
      query: ({token, ...payload}) => ({
        url: `/user/user/block`,
        method: "PUT",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(updateUser(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    addToDepartment: builder.mutation({
      query: (payload) => ({
        url: `/user/add_to_department`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(updateUser(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    changeUserDepartment: builder.mutation({
      query: (payload) => ({
        url: `/user/change_user_department`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(removeChat(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/user/create_user`,
        method: "POST",
        body: payload
      })
    })
  }),
});
