import { apiSlice } from "../../data/api/apiSlice";

export const currenciesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["currencies"],
    endpoints: builder => ({
        getCurrenciesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/currencies/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['currencies']
        }),
        addCurrencies: builder.mutation({
            query: currencie => ({
                url: '/currencies/',
                method: 'POST',
                body: { ...currencie }
            }),
            invalidatesTags: ['currencies'],
        }),
        updateCurrencies: builder.mutation({
            query: currencie => ({
                url: `/currencies/${currencie.id}/`,
                method: 'PUT',
                body: { ...currencie }
            }),
            invalidatesTags: ['currencies'],
        }),
        getCurrenciesID: builder.query({
            query: ({ id }) => ({
                url: `/currencies/${id}/`,
            }),
            providesTags: ['currencies']
        }),
    })
})

export const { 
    useGetCurrenciesListQuery,
    useGetCurrenciesIDQuery,
    useAddCurrenciesMutation,
    useUpdateCurrenciesMutation,
} = currenciesApiSlice;