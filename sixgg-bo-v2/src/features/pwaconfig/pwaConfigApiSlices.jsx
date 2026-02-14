import { apiSlice } from "../../data/api/apiSlice";

export const pwaConfigApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["pwaconfig"],
    endpoints: builder => ({
        getPWAConfigList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/pwaconfig/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['pwaconfig']
        }),
        addPWAConfig: builder.mutation({
            query: pwaconfig => ({
                url: '/pwaconfig/',
                method: 'POST',
                body: { ...pwaconfig }
            }),
            invalidatesTags: ['pwaconfig'],
        }),
        updatePWAConfig: builder.mutation({
            query: pwaconfig => ({
                url: `/pwaconfig/${pwaconfig.id}/`,
                method: 'PUT',
                body: { ...pwaconfig }
            }),
            invalidatesTags: ['pwaconfig'],
        }),
        getPWAConfigID: builder.query({
            query: ({ id }) => ({
                url: `/pwaconfig/${id}/`,
            }),
            providesTags: ['pwaconfig']
        }),
    })
})

export const { 
    useGetPWAConfigListQuery,
    useGetPWAConfigQuery,
    useAddPWAConfigMutation,
    useUpdatePWAConfigMutation
} = pwaConfigApiSlices;