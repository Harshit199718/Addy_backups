import { apiSlice } from "../../data/api/apiSlice";

export const newsfeedApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["newsfeeds"],
    endpoints: builder => ({
        getNewsFeedList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/newsfeeds/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['newsfeeds']
        }),
        addNewsFeed: builder.mutation({
            query: newsfeed => ({
                url: '/newsfeeds/',
                method: 'POST',
                body: { ...newsfeed }
            }),
            invalidatesTags: ['newsfeeds'],
        }),
        updateNewsFeed: builder.mutation({
            query: newsfeed => ({
                url: `/newsfeeds/${newsfeed.id}/`,
                method: 'PUT',
                body: { ...newsfeed }
            }),
            invalidatesTags: ['newsfeeds'],
        }),
        getNewsFeedID: builder.query({
            query: ({ id }) => ({
                url: `/newsfeeds/${id}/`,
            }),
            providesTags: ['newsfeeds']
        }),
    })
})

export const { 
    useGetNewsFeedListQuery,
    useGetNewsFeedIDQuery,
    useAddNewsFeedMutation,
    useUpdateNewsFeedMutation,
} = newsfeedApiSlice;