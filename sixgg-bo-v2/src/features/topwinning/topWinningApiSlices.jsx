import { apiSlice } from "../../data/api/apiSlice";

export const topWinningApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["topwinning"],
    endpoints: builder => ({
        getTopWinningList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/topwinning/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['topwinning']
        }),
        addTopWinning: builder.mutation({
            query: topwinning => ({
                url: '/topwinning/',
                method: 'POST',
                body: { ...topwinning }
            }),
            invalidatesTags: ['topwinning'],
        }),
        updateTopWinning: builder.mutation({
            query: topwinning => ({
                url: `/topwinning/${topwinning.id}/`,
                method: 'PUT',
                body: { ...topwinning }
            }),
            invalidatesTags: ['topwinning'],
        }),
        getTopWinningID: builder.query({
            query: ({ id }) => ({
                url: `/topwinning/${id}/`,
            }),
            providesTags: ['topwinning']
        }),
    })
})

export const { 
    useGetTopWinningListQuery,
    useGetTopWinningIDQuery,
    useAddTopWinningMutation,
    useUpdateTopWinningMutation
} = topWinningApiSlice;