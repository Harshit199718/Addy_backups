import { apiSlice } from "../../data/api/apiSlice";

export const generalApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["general"],
    endpoints: builder => ({
        getNotificationBadge: builder.query({
            query: () => ({
                url: `/transactions/pending_count/`,
            }),
            providesTags: ['general']
        }),
        getOperatorWallet: builder.query({
            query: () => ({
                url: `/daily/walletandunaclaim`,
            }),
            providesTags: ['general']
        }),
    })
})

export const { 
    useGetNotificationBadgeQuery,
    useGetOperatorWalletQuery
} = generalApiSlices;