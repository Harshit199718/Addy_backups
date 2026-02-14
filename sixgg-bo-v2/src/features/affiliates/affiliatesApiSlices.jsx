import { apiSlice } from "../../data/api/apiSlice";

export const affiliatesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["affiliates"],
    endpoints: builder => ({
        getAffiliatesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/affiliates/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            refetchOnWindowFocus: 'always',
            providesTags: ['affiliates']
        }),
        addAffiliates: builder.mutation({
            query: affiliates => ({
                url: '/affiliates/',
                method: 'POST',
                body: { ...affiliates }
            }),
            invalidatesTags: ['affiliates'],
        }),
        updateAffiliates: builder.mutation({
            query: affiliates => ({
                url: `/affiliates/${affiliates.id}/`,
                method: 'PUT',
                body: { ...affiliates }
            }),
            invalidatesTags: ['affiliates'],
        }),
        getAffiliatesID: builder.query({
            query: ({ id }) => ({
                url: `/affiliates/${id}`,
            }),
            providesTags: ['affiliates']
        }),
        addAffiliatesCredit: builder.mutation({
            query: affiliates => ({
                url: `/affiliates/${affiliates.id}/add-credit/`,
                method: 'POST',
                body: { ...affiliates }
            }),
            invalidatesTags: ['affiliates'],
        }),
        getAffiliatesCreditHistoryList: builder.query({
            query: affiliates => ({
                url: `/affiliates/${affiliates.id}/credit-history`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['affiliates']
        }),
        addSubAgent: builder.mutation({
            query: affiliates => ({
                url: `/affiliates/by-cred/`,
                method: 'POST',
                body: { ...affiliates }
            }),
            invalidatesTags: ['affiliates'],
        }),
    })
})

export const { 
    useGetAffiliatesListQuery,
    useGetAffiliatesIDQuery,
    useGetAffiliatesCreditHistoryListQuery,
    useAddAffiliatesMutation,
    useAddAffiliatesCreditMutation,
    useAddSubAgentMutation,
    useUpdateAffiliatesMutation
} = affiliatesApiSlice;