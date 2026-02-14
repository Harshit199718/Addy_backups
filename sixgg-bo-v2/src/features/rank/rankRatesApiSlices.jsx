import { apiSlice } from "../../data/api/apiSlice";

export const rankRatesApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["rankrates"],
    endpoints: builder => ({
        getRankRatesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/rankrates/` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['rankrates']
        }),
        addRankRates: builder.mutation({
            query: rankrates => ({
                url: '/rankrates/',
                method: 'POST',
                body: { ...rankrates }
            }),
            invalidatesTags: ['rankrates'],
        }),
        updateRankRates: builder.mutation({
            query: rankrates => ({
                url: `/rankrates/${rankrates.id}`,
                method: 'PUT',
                body: { ...rankrates }
            }),
            invalidatesTags: ['rankrates'],
        }),
        getRankRatesID: builder.query({
            query: ({ id }) => ({
                url: `/rankrates/${id}/`,
            }),
            providesTags: ['rankrates']
        }),
    })
})

export const { 
    useGetRankRatesListQuery,
    useGetRankRatesIDQuery,
    useAddRankRatesMutation,
    useUpdateRankRatesMutation
} = rankRatesApiSlices;