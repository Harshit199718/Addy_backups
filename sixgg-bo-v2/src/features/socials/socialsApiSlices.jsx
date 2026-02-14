import { apiSlice } from "../../data/api/apiSlice";

export const socialsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["socials"],
    endpoints: builder => ({
        getSocialsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/socials/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['socials']
        }),
        addSocials: builder.mutation({
            query: social => ({
                url: '/socials/',
                method: 'POST',
                body: { ...social }
            }),
            invalidatesTags: ['socials'],
        }),
        updateSocials: builder.mutation({
            query: social => ({
                url: `/socials/${social.id}/`,
                method: 'PUT',
                body: { ...social }
            }),
            invalidatesTags: ['socials'],
        }),
        getSocialsID: builder.query({
            query: ({ id }) => ({
                url: `/socials/${id}/`,
            }),
            providesTags: ['socials']
        }),
    })
})

export const { 
    useGetSocialsListQuery,
    useGetSocialsIDQuery,
    useAddSocialsMutation,
    useUpdateSocialsMutation
} = socialsApiSlice;