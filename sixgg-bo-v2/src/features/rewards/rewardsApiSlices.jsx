import { apiSlice } from "../../data/api/apiSlice";

export const rewardsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["rewards"],
    endpoints: builder => ({
        generatePlayerSingleLevelRebate: builder.query({
            query: ({ filters }) => ({
                url: `/rewards/generate_player_rebate_single_level` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['rewards']
        }),
        getSingleLevelRewardReferral: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/rewards/referral_payout_summary/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['rewards']
        }),
        getSingleLevelRewardRebate: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/rewards/rebate_payout_summary/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['rewards']
        }),
        getRewardsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/rewards/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['rewards']
        }),
    })
})

export const { 
    useLazyGeneratePlayerSingleLevelRebateQuery,
    useGeneratePlayerSingleLevelRebateQuery,
    useGetSingleLevelRewardReferralQuery,
    useGetSingleLevelRewardRebateQuery,
    useGetRewardsListQuery,
} = rewardsApiSlice;