import { setDepartments } from "../app/slices/departmentsSlice";
import { livechatapi } from "./livechatapi";


export const departmentsApi = livechatapi.injectEndpoints({
  reducerPath: "departmentsApi",
  endpoints: (builder) => ({
    // chats
    getDepartments: builder.query({
      query: () => `/department/all/`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setDepartments(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    createDepartment: builder.mutation({
      query: (name) => ({
        url: `/department/create/`,
        method: "POST",
        body: {
          name
        }
      }),
    }),
  }),
});