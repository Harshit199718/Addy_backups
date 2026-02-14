import { apiSlice } from "../../../data/api/apiSlice";

export const withdrawalApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["withdrawal"],
    endpoints: builder => ({
        withdrawalCreate: builder.mutation({
            query: withdrawal => ({
                url: `/withdrawals/`,
                method: 'POST',
                body: { ...withdrawal }
            }),
            invalidatesTags: ['withdrawal', 'transactions', 'general', 'players'],
        }),
        withdrawalAction: builder.mutation({
            query: withdrawal => ({
                url: `/withdrawals/${withdrawal.id}/`,
                method: 'PUT',
                body: { ...withdrawal }
            }),
            invalidatesTags: ['withdrawal', 'transactions', 'general', 'players'],
        }),
    })
})

export const { 
    useWithdrawalCreateMutation,
    useWithdrawalActionMutation,
} = withdrawalApiSlice;