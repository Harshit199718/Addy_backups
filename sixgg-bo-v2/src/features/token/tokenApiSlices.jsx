import { apiSlice } from "../../data/api/apiSlice";

export const tokenApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["token"],
    endpoints: builder => ({
        getTokenList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/checkintoken/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['token']
        }),
        addToken: builder.mutation({
            query: token => ({
                url: '/checkintoken/',
                method: 'POST',
                body: { ...token }
            }),
            invalidatesTags: ['token', 'players'],
        }),
    })
})

export const { 
    useGetTokenListQuery,
    useAddTokenMutation,
} = tokenApiSlice;