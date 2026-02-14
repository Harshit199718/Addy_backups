import { apiSlice } from "../../data/api/apiSlice";

export const luckyWheelHistoryApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["luckywheelhistory"],
    endpoints: builder => ({
        getLuckyWheelHistoryList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/luckywheelhistory/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['luckywheelhistory']
        }),
        addLuckyWheelHistory: builder.mutation({
            query: luckywheelhistory => ({
                url: '/luckywheelhistory/',
                method: 'POST',
                body: { ...luckywheelhistory }
            }),
            invalidatesTags: ['luckywheelhistory'],
        }),
        updateLuckyWheelHistory: builder.mutation({
            query: luckywheelhistory => ({
                url: `/luckywheelhistory/${luckywheelhistory.id}/`,
                method: 'PUT',
                body: { ...luckywheelhistory }
            }),
            invalidatesTags: ['luckywheelhistory'],
        }),
        getLuckyWheelHistoryID: builder.query({
            query: ({ id }) => ({
                url: `/luckywheelhistory/${id}/`,
            }),
            providesTags: ['luckywheelhistory']
        }),
    })
})

export const { 
    useGetLuckyWheelHistoryListQuery,
    useGetLuckyWheelHistoryIDQuery,
    useAddLuckyWheelHistoryMutation,
    useUpdateLuckyWheelHistoryMutation,
} = luckyWheelHistoryApiSlice;