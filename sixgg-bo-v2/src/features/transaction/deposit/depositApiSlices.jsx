import { apiSlice } from "../../../data/api/apiSlice";

export const depositApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["deposit"],
    endpoints: builder => ({
        depositCreate: builder.mutation({
            query: deposit => ({
                url: `/deposits/`,
                method: 'POST',
                body: { ...deposit }
            }),
            invalidatesTags: ['deposit', 'transactions', 'general', 'players'],
        }),
        depositAction: builder.mutation({
            query: deposit => ({
                url: `/deposits/${deposit.id}/`,
                method: 'PUT',
                body: { ...deposit }
            }),
            invalidatesTags: ['deposit', 'transactions', 'general', 'players'],
        }),
        getDepositList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/deposits/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['deposit']
        }),
    })
})

export const { 
    useDepositCreateMutation,
    useDepositActionMutation,
    useLazyGetDepositListQuery,
} = depositApiSlice;