import { apiSlice } from "../../../data/api/apiSlice";

export const dropTransactionGamesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["droptransactiongames"],
    endpoints: builder => ({
        dropTransactionGamesCreate: builder.mutation({
            query: droptransactiongames => ({
                url: `/droptransactiongames/`,
                method: 'POST',
                body: { ...droptransactiongames }
            }),
            invalidatesTags: ['droptransactiongames', 'transactions', 'general', 'players'],
        }),
        dropTransactionGamesAction: builder.mutation({
            query: droptransactiongames => ({
                url: `/droptransactiongames/${droptransactiongames.id}/`,
                method: 'PUT',
                body: { ...droptransactiongames }
            }),
            invalidatesTags: ['droptransactiongames', 'transactions', 'general', 'players'],
        }),
    })
})

export const { 
    useDropTransactionGamesCreateMutation,
    useDropTransactionGamesActionMutation,
} = dropTransactionGamesApiSlice;