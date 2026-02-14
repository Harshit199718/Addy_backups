import { apiSlice } from "../../data/api/apiSlice";

export const betHistoryApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["bethistory"],
    endpoints: builder => ({
        getBetHistoryListByPlayer: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/bethistory/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['bethistory']
        }),
        getBetHistoryTurnoverByPlayer: builder.query({
            query: ({playerId}) => ({
                url: `/bethistory/turnover-rollover-info-V3?filter={"userid":${playerId}}`,
            }),
            providesTags: ['bethistory']
        }),
    })
})

export const { 
    useGetBetHistoryListByPlayerQuery,
    useGetBetHistoryTurnoverByPlayerQuery
} = betHistoryApiSlice;