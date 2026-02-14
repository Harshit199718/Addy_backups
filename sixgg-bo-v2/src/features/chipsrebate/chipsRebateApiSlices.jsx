import { apiSlice } from "../../data/api/apiSlice";

export const chipsRebateApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["chipsrebate"],
    endpoints: builder => ({
        getChipsRebateList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/chipsrebate/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['chipsrebate']
        }),
        updateChipsRebate: builder.mutation({
            query: chipsrebate => ({
                url: `/chipsrebate/${chipsrebate.id}/`,
                method: 'PUT',
                body: { ...chipsrebate }
            }),
            invalidatesTags: ['chipsrebate'],
        }),
    })
})

export const { 
    useGetChipsRebateListQuery,
    useUpdateChipsRebateMutation
} = chipsRebateApiSlices;