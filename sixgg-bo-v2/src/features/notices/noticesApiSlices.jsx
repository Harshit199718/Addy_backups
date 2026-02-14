import { apiSlice } from "../../data/api/apiSlice";

export const noticesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["notices"],
    endpoints: builder => ({
        getNoticesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/notices/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['notices']
        }),
        addNotices: builder.mutation({
            query: notice => ({
                url: '/notices/',
                method: 'POST',
                body: { ...notice }
            }),
            invalidatesTags: ['notices'],
        }),
        updateNotices: builder.mutation({
            query: notice => ({
                url: `/notices/${notice.id}/`,
                method: 'PUT',
                body: { ...notice }
            }),
            invalidatesTags: ['notices'],
        }),
        getNoticesID: builder.query({
            query: ({ id }) => ({
                url: `/notices/${id}/`,
            }),
            providesTags: ['notices']
        }),
    })
})

export const { 
    useGetNoticesListQuery,
    useGetNoticesIDQuery,
    useAddNoticesMutation,
    useUpdateNoticesMutation
} = noticesApiSlice;