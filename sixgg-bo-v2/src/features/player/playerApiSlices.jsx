import { apiSlice } from "../../data/api/apiSlice";

export const playerApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["players"],
    endpoints: builder => ({
        getPlayerList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/players/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['players']
        }),
        getPlayerSimpleList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/players/get_players_simple/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['players']
        }),
        getPlayerReferredPlayer: builder.query({
            query: ({ pagination, filters, sorting, playerID }) => ({
                url: `/players/${playerID}/referred_players/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['players']
        }),
        updatePlayer: builder.mutation({
            query: player => ({
                url: `/players/${player.id}/`,
                method: 'PUT',
                body: { ...player }
            }),
            invalidatesTags: ['players'],
        }),
        getPlayerID: builder.query({
            query: ({ id }) => ({
                url: `/players/${id}/`,
            }),
            providesTags: ['players']
        }),
        getPlayerStealthToken: builder.mutation({
            query: player => ({
                url: `/stealth/token/`,
                method: 'POST',
                body: { ...player }
            }),
            invalidatesTags: ['players']
        }),
        addPlayer: builder.mutation({
            query: player => ({
                url: '/fe/signup/',
                method: 'POST',
                body: { ...player }
            }),
            invalidatesTags: ['players'],
        }),
        transferHoldWallet: builder.mutation({
            query: player => ({
                url: `/wallets/${player.wallet_id}/transfer/`,
                method: 'POST',
                body: { ...player }
            }),
            invalidatesTags: ['players'],
        }),
        getPlayerCheckRisk: builder.query({
            query: ({ id, filters }) => ({
                url: `/players/${id}/check_risk` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            providesTags: ['players']
        }),
    }),
})

export const { 
    useGetPlayerListQuery,
    useGetPlayerSimpleListQuery,
    useGetPlayerReferredPlayerQuery,
    useGetPlayerIDQuery,
    useLazyGetPlayerIDQuery,
    useGetPlayerCheckRiskQuery,
    useUpdatePlayerMutation,
    useGetPlayerStealthTokenMutation,
    useAddPlayerMutation,
    useTransferHoldWalletMutation,
} = playerApiSlice;