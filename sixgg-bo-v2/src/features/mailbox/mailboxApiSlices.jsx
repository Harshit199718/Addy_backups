import { apiSlice } from "../../data/api/apiSlice";

export const mailboxApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["mailbox"],
    endpoints: builder => ({
        getMailboxList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/mailbox/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['mailbox']
        }),
        addMailbox: builder.mutation({
            query: mailbox => ({
                url: '/mailbox/',
                method: 'POST',
                body: { ...mailbox }
            }),
            invalidatesTags: ['mailbox'],
        }),
        updateMailbox: builder.mutation({
            query: mailbox => ({
                url: `/mailbox/${mailbox.id}`,
                method: 'PUT',
                body: { ...mailbox }
            }),
            invalidatesTags: ['mailbox'],
        }),
        getMailboxID: builder.query({
            query: ({ id }) => ({
                url: `/mailbox/${id}`,
            }),
            providesTags: ['mailbox']
        }),
    })
})

export const { 
    useGetMailboxListQuery,
    useGetMailboxIDQuery,
    useAddMailboxMutation,
    useUpdateMailboxMutation,
} = mailboxApiSlice;