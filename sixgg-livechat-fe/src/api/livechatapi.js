import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setBackofficeColors, setSettings, setTheme } from "../app/slices/generalSlice";
import CryptoJS from 'crypto-js';
import { backofficeColors } from "../backofficeColors";
const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;
const SECRET_KEY = 'your_secret_key';
function getSiteName() {
  return localStorage.getItem("siteName")
}
export function getInstanceToken() {
  const instanceName = localStorage.getItem("instanceName");
  const instanceId = localStorage.getItem("instanceId");
  return CryptoJS.AES.encrypt(JSON.stringify({instanceName, instanceId}), SECRET_KEY).toString()
}
export const livechatapi = createApi({
  reducerPath: "livechatapi",
  tagTypes: ["Settings", "Chats", "BOColors"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${LIVECHAT_API_URL}/app/api`,
    prepareHeaders: (headers) => {
      // You can dynamically modify headers here if needed for all requests
      const siteName = getSiteName();
      headers.set("site-name", siteName);
      headers.set("instance-token", getInstanceToken());
      headers.set("is-superbo", localStorage.getItem("isSuperBO"));
      headers.set("Authorization", `Bearer ${JSON.parse(localStorage.getItem("livechat_user"))?.access}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSettings: builder.mutation({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          let theme = backofficeColors
          if (data?.status && (arg==="user" || arg==="anonymous")) {
            const colors = data?.data?.find(setting => setting.key==="colors")?.settings
            colors?.forEach(color => {
              theme[`${color?.key}_color`] = color?.value;
            });
          }
          console.log("theme obj", theme)
          dispatch(setTheme(theme))
          dispatch(setSettings(data?.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getBackofficeColors: builder.query({
      query: () => ({
        url: "/settings/backoffice",
        method: "GET",
      }),
      providesTags: ["BOColors"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setBackofficeColors(data.data[0]))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: ["Settings"]
    }),
    updateBackofficeColors: builder.mutation({
      query: (payload) => ({
        url: "/settings/backoffice/update",
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          console.log("setBackofficeColors", data)
          dispatch(setBackofficeColors(data.data))
        } catch (error) {
          console.log(error)
        }
      },
    }),    
    updateSetting: builder.mutation({
      query: (siteUpdates) => ({
        url: "/settings/update",
        method: "PUT",
        body: siteUpdates,
      }),
    }),    
    uploadImage: builder.mutation({
      query: (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        return {
          url: '/upload/image',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});
