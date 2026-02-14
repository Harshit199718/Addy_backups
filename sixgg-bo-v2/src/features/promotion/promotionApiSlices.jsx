import { apiSlice } from "../../data/api/apiSlice";

export const promotionApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["promotions"],
    endpoints: builder => ({
        getPromotionList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/promotions/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['promotions']
        }),
        addPromotion: builder.mutation({
            query: promotion => ({
                url: '/promotions/',
                method: 'POST',
                body: { ...promotion }
            }),
            invalidatesTags: ['promotions'],
        }),
        updatePromotion: builder.mutation({
            query: promotion => ({
                url: `/promotions/${promotion.id}/`,
                method: 'PUT',
                body: { ...promotion }
            }),
            invalidatesTags: ['promotions'],
        }),
        getPromotionID: builder.query({
            query: ({ id }) => ({
                url: `/promotions/${id}`,
            }),
            providesTags: ['promotions']
        }),
        getPromotionEligible: builder.query({
            query: ({ filters }) => ({
                url: `/promotion_player/check` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            providesTags: ['promotion_player']
        }),
        getPromotionBonusCalcualtion: builder.query({
            query: ({ filters }) => ({
                url: `/promotions/calculate_bonus_amount` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            providesTags: ['promotions']
        }),
    })
})

export const { 
    useGetPromotionListQuery,
    useAddPromotionMutation,
    useUpdatePromotionMutation,
    useGetPromotionIDQuery,
    useLazyGetPromotionEligibleQuery,
    useLazyGetPromotionBonusCalcualtionQuery,
} = promotionApiSlice;