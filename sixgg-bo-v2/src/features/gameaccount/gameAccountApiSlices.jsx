import { apiSlice } from "../../data/api/apiSlice";

export const gameAccountApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["gameaccounts"],
    endpoints: builder => ({
        getGameAccountByPlayerList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/gameaccounts/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['gameaccounts']
        }),
        startAppGameAccount: builder.mutation({
            query: gameAccount => ({
                url: `/startappsgame/${gameAccount.product}/${gameAccount.player}/start/`,
                method: 'POST',
                body: { ...gameAccount }
            }),
            invalidatesTags: ['gameaccounts'],
        }),
        stopAppGameAccount: builder.mutation({
            query: gameAccount => ({
                url: `/stopappsgame/${gameAccount.user}/stop/`,
                method: 'POST',
            }),
            invalidatesTags: ['gameaccounts'],
        }),
        updateGameAccount: builder.mutation({
            query: gameAccount => ({
                url: `/gameaccounts/${gameAccount.id}/`,
                method: 'PUT',
                body: { ...gameAccount }
            }),
            invalidatesTags: ['gameaccounts'],
        }),
        checkStatusGameAccount: builder.mutation({
            query: gameAccount => ({
                url: `/game/${gameAccount.product.id}/${gameAccount.user}/balance/`,
                method: 'POST',
            }),
            invalidatesTags: ['gameaccounts'],
        }),
        getGameAccountSearchList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/gameaccount/search` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['gameaccounts']
        }),
        batchDiscardGameAccount: builder.mutation({
            query: gameAccount => ({
                url: `/gameaccounts/batchremove/`,
                method: 'POST',
                body: { ...gameAccount }
            }),
            invalidatesTags: ['gameaccounts'],
        }),
    })
})

export const { 
    useGetGameAccountByPlayerListQuery,
    useGetGameAccountSearchListQuery,
    useStartAppGameAccountMutation,
    useStopAppGameAccountMutation,
    useUpdateGameAccountMutation,
    useCheckStatusGameAccountMutation,
    useBatchDiscardGameAccountMutation,
} = gameAccountApiSlice;