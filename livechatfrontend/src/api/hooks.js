import { chatApi } from "./chatApi";
import { livechatapi } from "./livechatapi";
import { userApi } from "./userApi";

export const {useGetSettingsQuery, useUpdateSettingMutation} = livechatapi;
export const {
    useGetAllChatsQuery,
    useGetMessagesMutation,
  } = chatApi;

export const {
    useAddUserAndLoginMutation,
    useGetUserDetailsQuery,
    useGetUsersQuery,
    useBlockUserMutation
  } = userApi;