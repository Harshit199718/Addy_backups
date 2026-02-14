import { setUser, setUserAuth, setUsers, updateUser } from "../app/slices/userSlice";
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
      query: (token) => ({
        url: `/user/profile/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
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
    getUsers: builder.query({
      query: (token) => ({
        url: `/user/all/`,
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
  }),
});
