import { apiSlice } from "../../data/api/apiSlice";

export const sitesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["sites"],
    endpoints: builder => ({
        getSitesList: builder.query({
            query: ({ pagination, filters, sorting}) => ({
                url: `/sites/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['sites']
        }),
        addSite: builder.mutation({
            query: sites => ({
                url: '/sites/',
                method: 'POST',
                body: { ...sites }
            }),
            invalidatesTags: ['sites'],
        }),
        updateSite: builder.mutation({
            query: sites => ({
                url: `/sites/${sites.id}/`,
                method: 'PUT',
                body: { ...sites }
            }),
            invalidatesTags: ['sites'],
        }),
    })
})

export const { 
    useLazyGetSitesListQuery,
    useGetSitesListQuery,
    useAddSiteMutation,
    useUpdateSiteMutation
} = sitesApiSlice;