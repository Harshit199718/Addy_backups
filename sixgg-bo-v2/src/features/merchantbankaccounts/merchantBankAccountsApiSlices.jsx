import { apiSlice } from "../../data/api/apiSlice";

export const merchantBankAccountsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["merchantbankaccounts"],
    endpoints: builder => ({
        getMerchantBankList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/merchantbankaccounts/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['merchantbankaccounts']
        }),
        addMerchantBank: builder.mutation({
            query: merchantBank => ({
                url: '/merchantbankaccounts/',
                method: 'POST',
                body: { ...merchantBank }
            }),
            invalidatesTags: ['merchantbankaccounts'],
        }),
        updateMerchantBank: builder.mutation({
            query: merchantBank => ({
                url: `/merchantbankaccounts/${merchantBank.id}/`,
                method: 'PUT',
                body: { ...merchantBank }
            }),
            invalidatesTags: ['merchantbankaccounts'],
        }),
        getMerchantBankID: builder.query({
            query: ({ id }) => ({
                url: `/merchantbankaccounts/${id}/`,
            }),
            providesTags: ['merchantbankaccounts']
        }),
        getMerchantBankMeter: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/merchantbank/balance` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['merchantbankaccounts']
        }),
    })
})

export const { 
    useGetMerchantBankListQuery,
    useGetMerchantBankIDQuery,
    useGetMerchantBankMeterQuery,
    useAddMerchantBankMutation,
    useUpdateMerchantBankMutation,
} = merchantBankAccountsApiSlice;