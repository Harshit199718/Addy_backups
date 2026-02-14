import { apiSlice } from "../../data/api/apiSlice";

export const mailApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["mail"],
    endpoints: builder => ({
        getMailList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/mail/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['mail']
        }),
        sendMail: builder.mutation({
            query: mail => ({
                url: '/mail/',
                method: 'POST',
                body: { ...mail }
            }),
            invalidatesTags: ['mail'],
        }),
        updateMail: builder.mutation({
            query: mail => ({
                url: `/mail/${mail.id}`,
                method: 'PUT',
                body: { ...mail }
            }),
            invalidatesTags: ['mail'],
        }),
    })
})

export const { 
    useGetMailListQuery,
    useSendMailMutation,
    useUpdateMailMutation,
} = mailApiSlice;