import { apiSlice } from "../../data/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: crendentials => ({
                url: '/token/',
                method: 'POST',
                body: { ...crendentials }
            })
        }),
    })
})

export const { 
    useLoginMutation
} = authApiSlice;