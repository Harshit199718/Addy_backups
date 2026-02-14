import { apiSlice } from "../../data/api/apiSlice";

export const partnershipApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["partnerships"],
    endpoints: builder => ({
        getPartnershipsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/partnerships/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['partnerships']
        }),
        addPartnerships: builder.mutation({
            query: partnerships => ({
                url: '/partnerships/',
                method: 'POST',
                body: { ...partnerships }
            }),
            invalidatesTags: ['partnerships'],
        }),
        updatePartnerships: builder.mutation({
            query: partnerships => ({
                url: `/partnerships/${partnerships.id}/`,
                method: 'PUT',
                body: { ...partnerships }
            }),
            invalidatesTags: ['partnerships'],
        }),
        getPartnershipsID: builder.query({
            query: ({ id }) => ({
                url: `/partnerships/${id}/`,
            }),
            providesTags: ['partnerships']
        }),
    })
})

export const { 
    useGetPartnershipsListQuery,
    useGetPartnershipsIDQuery,
    useAddPartnershipsMutation,
    useUpdatePartnershipsMutation
} = partnershipApiSlice;