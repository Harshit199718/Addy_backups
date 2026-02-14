import { apiSlice } from "../../data/api/apiSlice";

export const kioskAccessApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["kioskaccess"],
    endpoints: builder => ({
        getKioskAccessList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/kioskaccess/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['kioskaccess']
        }),
        addKioskAccess: builder.mutation({
            query: kioskaccess => ({
                url: '/kioskaccess/',
                method: 'POST',
                body: { ...kioskaccess }
            }),
            invalidatesTags: ['kioskaccess'],
        }),
        updateKioskAccess: builder.mutation({
            query: kioskaccess => ({
                url: `/kioskaccess/${kioskaccess.id}/`,
                method: 'PUT',
                body: { ...kioskaccess }
            }),
            invalidatesTags: ['kioskaccess'],
        }),
        getKioskAccessID: builder.query({
            query: ({ id }) => ({
                url: `/kioskaccess/${id}/`,
            }),
            providesTags: ['kioskaccess']
        }),
    })
})

export const { 
    useGetKioskAccessListQuery,
    useGetKioskAccessIDQuery,
    useAddKioskAccessMutation,
    useUpdateKioskAccessMutation,
} = kioskAccessApiSlice;