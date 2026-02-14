import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;

export function getDynamicSiteName() {
  // Assuming you have set this somewhere in your app
  return localStorage.getItem('SITE_NAME');
}

export const livechatapi = createApi({
  reducerPath: "livechatapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${LIVECHAT_API_URL}/app/api`,
    prepareHeaders: (headers) => {
      const siteName = getDynamicSiteName();
      // You can dynamically modify headers here if needed for all requests
      headers.set("site-name", siteName);
      headers.set("Authorization", `Bearer ${JSON.parse(localStorage.getItem("livechat_user"))?.access}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
    }),
    updateSetting: builder.mutation({
      query: (payload) => ({
        url: "/settings/update",
        method: "PUT",
        body: payload
      }),
    }),
  }),
});
