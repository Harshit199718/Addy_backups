import { apiSlice } from "../../data/api/apiSlice";

export const skinConfigApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["skinconfig"],
    endpoints: builder => ({
        getSkinConfigList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/skinconfig/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['skinconfig']
        }),
        addSkinConfig: builder.mutation({
            query: skinconfig => ({
                url: '/skinconfig/',
                method: 'POST',
                body: { ...skinconfig }
            }),
            invalidatesTags: ['skinconfig'],
        }),
        updateSkinConfig: builder.mutation({
            query: ({ skinconfig, id }) => ({
                url: `/skinconfig/${id}/`,
                method: 'PUT',
                body: skinconfig
            }),
            invalidatesTags: ['skinconfig'],
        }),
    })
})

export const { 
    useGetSkinConfigListQuery,
    useLazyGetSkinConfigListQuery,
    useAddSkinConfigMutation,
    useUpdateSkinConfigMutation
} = skinConfigApiSlice;