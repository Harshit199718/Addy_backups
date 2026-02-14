import { apiSlice } from "../../data/api/apiSlice";

export const unclaimsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["unclaims"],
    endpoints: builder => ({
        getUnclaimsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/unclaim/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['unclaims']
        }),
        addUnclaims: builder.mutation({
            query: unclaims => ({
                url: '/unclaim/',
                method: 'POST',
                body: { ...unclaims }
            }),
            invalidatesTags: ['unclaims'],
        }),
        updateUnclaims: builder.mutation({
            query: unclaims => ({
                url: `/unclaim/${unclaims.id}/`,
                method: 'PUT',
                body: { ...unclaims }
            }),
            invalidatesTags: ['unclaims'],
        }),
        getUnclaimsID: builder.query({
            query: ({ id }) => ({
                url: `/unclaim/${id}/`,
            }),
            providesTags: ['unclaims']
        }),
    })
})

export const { 
    useGetUnclaimsListQuery,
    useGetUnclaimsIDQuery,
    useAddUnclaimsMutation,
    useUpdateUnclaimsMutation
} = unclaimsApiSlice;