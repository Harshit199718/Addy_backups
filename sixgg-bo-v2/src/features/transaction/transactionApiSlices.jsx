import { apiSlice } from "../../data/api/apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["transactions"],
    endpoints: builder => ({
        getTransactionList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/jqk/transactions/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['transactions']
        }),
        getTransactionListByPlayer: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/jqk/transactions/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['transactions']
        }),
        getTransactionListByParent: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/transactions/` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['transactions']
        }),
    })
})

export const { 
    useGetTransactionListQuery,
    useGetTransactionListByPlayerQuery,
    useGetTransactionListByParentQuery,
} = transactionApiSlice;