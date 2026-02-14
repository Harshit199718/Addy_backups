import { apiSlice } from "../../data/api/apiSlice";

export const promotionGroupApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["promotiongroup"],
    endpoints: builder => ({
        getPromotionGroupList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/promotiongroup/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['promotiongroup']
        }),
        addPromotionGroup: builder.mutation({
            query: promotionGroup => ({
                url: '/promotiongroup/',
                method: 'POST',
                body: { ...promotionGroup }
            }),
            invalidatesTags: ['promotiongroup'],
        }),
        updatePromotionGroup: builder.mutation({
            query: promotionGroup => ({
                url: `/promotiongroup/${promotionGroup.id}/`,
                method: 'PUT',
                body: { ...promotionGroup }
            }),
            invalidatesTags: ['promotiongroup'],
        }),
        getPromotionGroupID: builder.query({
            query: ({ id }) => ({
                url: `/promotiongroup/${id}/`,
            }),
            providesTags: ['promotiongroup']
        }),
    })
})

export const { 
    useGetPromotionGroupListQuery,
    useGetPromotionGroupIDQuery,
    useAddPromotionGroupMutation,
    useUpdatePromotionGroupMutation
} = promotionGroupApiSlice;