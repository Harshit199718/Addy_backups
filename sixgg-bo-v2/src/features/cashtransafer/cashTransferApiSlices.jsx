import { apiSlice } from "../../data/api/apiSlice";

export const cashTransferApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["cashtransfer"],
    endpoints: builder => ({
        getCashTransferList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/cash/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['cashtransfer']
        }),
        addCashTransfer: builder.mutation({
            query: cashtransfer => ({
                url: '/cash/',
                method: 'POST',
                body: { ...cashtransfer }
            }),
            invalidatesTags: ['cashtransfer', 'merchantbankaccounts'],
        }),
        updateCashTransfer: builder.mutation({
            query: cashtransfer => ({
                url: `/cash/${cashtransfer.id}/`,
                method: 'PUT',
                body: { ...cashtransfer }
            }),
            invalidatesTags: ['cashtransfer', 'merchantbankaccounts'],
        }),
        getCashTransferID: builder.query({
            query: ({ id }) => ({
                url: `/cash/${id}/`,
            }),
            providesTags: ['cashtransfer']
        }),
    })
})

export const { 
    useGetCashTransferListQuery,
    useAddCashTransferMutation,
    useUpdateCashTransferMutation,
} = cashTransferApiSlice;