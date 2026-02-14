import { apiSlice } from "../../data/api/apiSlice";

export const banksApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["banks"],
    endpoints: builder => ({
        getBanksList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/banks/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['banks']
        }),
        addBank: builder.mutation({
            query: bank => ({
                url: '/banks/',
                method: 'POST',
                body: { ...bank }
            }),
            invalidatesTags: ['banks'],
        }),
        updateBank: builder.mutation({
            query: bank => ({
                url: `/banks/${bank.id}/`,
                method: 'PUT',
                body: { ...bank }
            }),
            invalidatesTags: ['banks'],
        }),
        getBanksID: builder.query({
            query: ({ id }) => ({
                url: `/banks/${id}`,
            }),
            providesTags: ['banks']
        }),
    })
})

export const { 
    useGetBanksListQuery,
    useGetBanksIDQuery,
    useAddBankMutation,
    useUpdateBankMutation
} = banksApiSlice;