import { apiSlice } from "../../data/api/apiSlice";

export const customerBankAccountsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["customerbankaccounts"],
    endpoints: builder => ({
        getCustomerBankAccountsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/customerbankaccounts/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['customerbankaccounts']
        }),
        addCustomerBankAccount: builder.mutation({
            query: bank => ({
                url: '/customerbankaccounts/',
                method: 'POST',
                body: { ...bank }
            }),
            invalidatesTags: ['customerbankaccounts'],
        }),
        updateCustomerBankAccount: builder.mutation({
            query: bank => ({
                url: `/customerbankaccounts/${bank.id}/`,
                method: 'PUT',
                body: { ...bank }
            }),
            invalidatesTags: ['customerbankaccounts'],
        }),
        getCustomerBankAccountID: builder.query({
            query: ({ id }) => ({
                url: `/customerbankaccounts/${id}`,
            }),
            providesTags: ['customerbankaccounts']
        }),
    })
})

export const { 
    useGetCustomerBankAccountsListQuery,
    useGetCustomerBankAccountIDQuery,
    useAddCustomerBankAccountMutation,
    useUpdateCustomerBankAccountMutation,
} = customerBankAccountsApiSlice;