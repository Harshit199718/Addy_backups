import { apiSlice } from "../../data/api/apiSlice";

export const gameListApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["gamelist"],
    endpoints: builder => ({
        getGameListList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/gamelist/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['gamelist']
        }),
        addGameList: builder.mutation({
            query: gamelist => ({
                url: '/gamelist/',
                method: 'POST',
                body: { ...gamelist }
            }),
            invalidatesTags: ['gamelist'],
        }),
        batchAddGameList: builder.mutation({
            query: gamelist => ({
                url: '/gamelist/batchcreate/',
                method: 'POST',
                body: { ...gamelist }
            }),
            invalidatesTags: ['gamelist'],
        }),
        updateGameList: builder.mutation({
            query: gamelist => ({
                url: `/gamelist/${gamelist.id}/`,
                method: 'PUT',
                body: { ...gamelist }
            }),
            invalidatesTags: ['gamelist'],
        }),
        getGameListID: builder.query({
            query: ({ id }) => ({
                url: `/gamelist/${id}/`,
            }),
            providesTags: ['gamelist']
        }),
    })
})

export const { 
    useGetGameListListQuery,
    useGetGameListIDQuery,
    useAddGameListMutation,
    useUpdateGameListMutation,
    useBatchAddGameListMutation,
} = gameListApiSlice;