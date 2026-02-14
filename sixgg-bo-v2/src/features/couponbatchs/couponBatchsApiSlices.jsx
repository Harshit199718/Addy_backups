import { apiSlice } from "../../data/api/apiSlice";

export const couponBatchsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["couponbatchs", "coupons", "coupontags"],
    endpoints: builder => ({
        getCouponBatchsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/couponbatchs/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['couponbatchs']
        }),
        addCouponBatchs: builder.mutation({
            query: couponbatchs => ({
                url: '/couponbatchs/',
                method: 'POST',
                body: { ...couponbatchs }
            }),
            invalidatesTags: ['couponbatchs'],
        }),
        updateCouponBatchs: builder.mutation({
            query: couponbatchs => ({
                url: `/couponbatchs/${couponbatchs.id}/`,
                method: 'PUT',
                body: { ...couponbatchs }
            }),
            invalidatesTags: ['couponbatchs'],
        }),
        getCouponBatchsID: builder.query({
            query: ({ id }) => ({
                url: `/couponbatchs/${id}/`,
            }),
            providesTags: ['couponbatchs']
        }),
        addIssueCoupon: builder.mutation({
            query: couponbatchs => ({
                url: '/couponbatchs/issue-coupon/',
                method: 'POST',
                body: { ...couponbatchs }
            }),
            invalidatesTags: ['couponbatchs', 'coupontags', 'coupons'],
        }),
        getCouponTagsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/coupontags/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['coupontags']
        }),
        getCouponsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/coupons/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['coupons']
        }),
    })
})

export const { 
    useGetCouponBatchsListQuery,
    useGetCouponTagsListQuery,
    useGetCouponsListQuery,
    useGetCouponBatchsIDQuery,
    useAddCouponBatchsMutation,
    useAddIssueCouponMutation,
    useUpdateCouponbatchsMutation,
} = couponBatchsApiSlice;