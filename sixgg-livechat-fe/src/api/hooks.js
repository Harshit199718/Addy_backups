import { chatApi } from "./chatApi";
import { departmentsApi } from "./departmentsApi";
import { livechatapi } from "./livechatapi";
import { userApi } from "./userApi";

export const {useGetSettingsMutation, useUpdateSettingMutation, useUploadImageMutation, useGetBackofficeColorsQuery, useUpdateBackofficeColorsMutation} = livechatapi;
export const {
    useGetAllChatsMutation,
    useGetChatDetailsQuery,
    useGetMessagesMutation,
    useSearchChatsMutation,
    useGetChatWithUsernameMutation
  } = chatApi;

export const {
    useAddUserAndLoginMutation,
    useCreateUserMutation,
    useGetUserDetailsQuery,
    useGetUsersMutation,
    useBlockUserMutation,
    useAddToDepartmentMutation,
    useChangeUserDepartmentMutation,
    useGetAgentsMutation
  } = userApi;

export const {
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
  } = departmentsApi;