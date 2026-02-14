import { apiSlice } from "../../data/api/apiSlice";

export const walletsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["wallets"],
    endpoints: builder => ({
        updateWallets: builder.mutation({
            query: wallets => ({
                url: `/wallets/${wallets.id}/`,
                method: 'PUT',
                body: { ...wallets }
            }),
            invalidatesTags: ['wallets', 'players', 'bethistory'],
        }),
    })
})

export const { 
    useUpdateWalletsMutation
} = walletsApiSlice;