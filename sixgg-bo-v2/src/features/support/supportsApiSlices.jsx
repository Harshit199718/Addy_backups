import { apiSlice } from "../../data/api/apiSlice";

export const supportsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["supports"],
    endpoints: builder => ({
        getSupportsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/supports/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['supports']
        }),
        addSupports: builder.mutation({
            query: support => ({
                url: '/supports/',
                method: 'POST',
                body: { ...support }
            }),
            invalidatesTags: ['supports'],
        }),
        updateSupports: builder.mutation({
            query: supports => ({
                url: `/supports/${supports.id}`,
                method: 'PUT',
                body: { ...supports }
            }),
            invalidatesTags: ['supports'],
        }),
        getSupportsID: builder.query({
            query: ({ id }) => ({
                url: `/supports/${id}`,
            }),
            providesTags: ['supports']
        }),
        addSupportsCredit: builder.mutation({
            query: supports => ({
                url: `/supports/${supports.id}/add-credit/`,
                method: 'POST',
                body: { ...supports }
            }),
            invalidatesTags: ['supports'],
        }),
        getCreditHistoryList: builder.query({
            query: supports => ({
                url: `/supports/${supports.id}/credit-history`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['supports']
        }),
    })
})

export const { 
    useGetSupportsListQuery,
    useGetSupportsIDQuery,
    useGetCreditHistoryListQuery,
    useAddSupportsMutation,
    useAddSupportsCreditMutation,
    useUpdateSupportsMutation,
} = supportsApiSlice;