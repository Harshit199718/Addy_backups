import { apiSlice } from "../../data/api/apiSlice";

export const bonusesApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["bonuses"],
    endpoints: builder => ({
        getBonusesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/bonuses/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['bonuses']
        }),
        updateBonuses: builder.mutation({
            query: bonuses => ({
                url: `/bonuses/${bonuses.id}/`,
                method: 'PUT',
                body: { ...bonuses }
            }),
            invalidatesTags: ['bonuses'],
        }),
        addBonuses: builder.mutation({
            query: bonuses => ({
                url: '/bonuses/',
                method: 'POST',
                body: { ...bonuses }
            }),
            invalidatesTags: ['bonuses', 'transactions'],
        }),
    })
})

export const { 
    useGetBonusesListQuery,
    useUpdateBonusesMutation,
    useAddBonusesMutation,
} = bonusesApiSlices;