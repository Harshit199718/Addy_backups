import { apiSlice } from "../../data/api/apiSlice";

export const ranksApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["ranks"],
    endpoints: builder => ({
        getRanksList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/ranks/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['ranks']
        }),
        addRank: builder.mutation({
            query: rank => ({
                url: '/ranks/',
                method: 'POST',
                body: { ...rank }
            }),
            invalidatesTags: ['ranks'],
        }),
        updateRank: builder.mutation({
            query: rank => ({
                url: `/ranks/${rank.id}`,
                method: 'PUT',
                body: { ...rank }
            }),
            invalidatesTags: ['ranks'],
        }),
        getRankID: builder.query({
            query: ({ id }) => ({
                url: `/ranks/${id}/`,
            }),
            providesTags: ['ranks']
        }),
    })
})

export const { 
    useGetRanksListQuery,
    useGetRanksIDQuery,
    useAddRankMutation,
    useUpdateRankMutation
} = ranksApiSlice;