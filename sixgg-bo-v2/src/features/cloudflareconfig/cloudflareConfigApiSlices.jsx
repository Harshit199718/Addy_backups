import { apiSlice } from "../../data/api/apiSlice";

export const cloudflareConfigApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["cloudflareconfig"],
    endpoints: builder => ({
        getCloudflareConfigList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/fe/domain/cloudflare/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['cloudflareconfig']
        }),
        addCloudflareConfig: builder.mutation({
            query: cloudflareconfig => ({
                url: '/fe/domain/cloudflare/',
                method: 'POST',
                body: { ...cloudflareconfig }
            }),
            invalidatesTags: ['cloudflareconfig'],
        }),
        updateCloudflareConfig: builder.mutation({
            query: cloudflareconfig => ({
                url: `/fe/domain/cloudflare/${cloudflareconfig.id}/`,
                method: 'PUT',
                body: { ...cloudflareconfig }
            }),
            invalidatesTags: ['cloudflareconfig'],
        }),
        getCloudflareConfigID: builder.query({
            query: ({ id }) => ({
                url: `/fe/domain/cloudflare/${id}/`,
            }),
            providesTags: ['cloudflareconfig']
        }),
        cloudflareAddDomain: builder.mutation({
            query: cloudflareconfig => ({
                url: `/fe/domain/cloudflare/adddomain/`,
                method: 'POST',
                body: { ...cloudflareconfig }
            }),
            invalidatesTags: ['cloudflareconfig'],
        }),
        cloudflareAddDomainProject: builder.mutation({
            query: cloudflareconfig => ({
                url: `/fe/domain/cloudflare/adddomainproject/`,
                method: 'POST',
                body: { ...cloudflareconfig }
            }),
            invalidatesTags: ['cloudflareconfig'],
        }),
    })
})

export const { 
    useGetCloudflareConfigListQuery,
    useGetCloudflareConfigIDQuery,
    useAddCloudflareConfigMutation,
    useUpdateCloudflareConfigMutation,
    useCloudflareAddDomainMutation,
    useCloudflareAddDomainProjectMutation
} = cloudflareConfigApiSlice;