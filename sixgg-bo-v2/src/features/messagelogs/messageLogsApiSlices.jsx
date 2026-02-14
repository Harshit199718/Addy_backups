import { apiSlice } from "../../data/api/apiSlice";

export const messageLogsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["messagelogs"],
    endpoints: builder => ({
        getMessageLogsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/messagelogs/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['messagelogs']
        }),
        addMessageLogs: builder.mutation({
            query: messagelog => ({
                url: '/messagelogs/',
                method: 'POST',
                body: { ...messagelog }
            }),
            invalidatesTags: ['messagelogs'],
        }),
        updateMessageLogs: builder.mutation({
            query: messagelog => ({
                url: `/messagelogs/${messagelog.id}/`,
                method: 'PUT',
                body: { ...messagelog }
            }),
            invalidatesTags: ['messagelogs'],
        }),
        getMessageLogsID: builder.query({
            query: ({ id }) => ({
                url: `/messagelogs/${id}/`,
            }),
            providesTags: ['messagelogs']
        }),
    })
})

export const { 
    useGetMessageLogsListQuery,
    useGetMessageLogsIDQuery,
    useAddMessageLogsMutation,
    useUpdateMessageLogsMutation,
} = messageLogsApiSlice;