import { apiSlice } from "../../../data/api/apiSlice";

export const dropTransactionDepositApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["droptransactiondeposit"],
    endpoints: builder => ({
        dropTransactionDepositCreate: builder.mutation({
            query: droptransactiondeposit => ({
                url: `/droptransactiondeposits/`,
                method: 'POST',
                body: { ...droptransactiondeposit }
            }),
            invalidatesTags: ['droptransactiondeposit', 'transactions', 'general', 'players'],
        }),
        dropTransactionDepositAction: builder.mutation({
            query: droptransactiondeposit => ({
                url: `/droptransactiondeposits/${droptransactiondeposits.id}/`,
                method: 'PUT',
                body: { ...droptransactiondeposit }
            }),
            invalidatesTags: ['droptransactiondeposit', 'transactions', 'general', 'players'],
        }),
    })
})

export const { 
    useDropTransactionDepositCreateMutation,
    useDropTransactionDepositActionMutation,
} = dropTransactionDepositApiSlice;