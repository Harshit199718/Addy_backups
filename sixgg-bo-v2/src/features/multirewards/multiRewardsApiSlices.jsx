import { apiSlice } from "../../data/api/apiSlice";

export const rewardsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["multilevelrewards"],
    endpoints: builder => ({
        getMultiLevelRewardReferral: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/multilevelrewards/referral_payout_summary/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['multilevelrewards']
        }),
        getMultiLevelRewardRebate: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/multilevelrewards/rebate_payout_summary/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['multilevelrewards']
        }),
    })
})

export const { 
    useGetMultiLevelRewardReferralQuery,
    useGetMultiLevelRewardRebateQuery,
} = rewardsApiSlice;