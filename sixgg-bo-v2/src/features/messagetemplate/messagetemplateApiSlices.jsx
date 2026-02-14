import { apiSlice } from "../../data/api/apiSlice";

export const messageTemplateApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["messagetemplate"],
    endpoints: builder => ({
        getMessageTemplateList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/messagetemplate/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['messagetemplate']
        }),
        addMessageTemplate: builder.mutation({
            query: messagetemplate => ({
                url: '/messagetemplate/',
                method: 'POST',
                body: { ...messagetemplate }
            }),
            invalidatesTags: ['messagetemplate'],
        }),
        updateMessageTemplate: builder.mutation({
            query: messagetemplate => ({
                url: `/messagetemplate/${messagetemplate.id}`,
                method: 'PUT',
                body: { ...messagetemplate }
            }),
            invalidatesTags: ['messagetemplate'],
        }),
        getMessageTemplateID: builder.query({
            query: ({ id }) => ({
                url: `/messagetemplate/${id}`,
            }),
            providesTags: ['messagetemplate']
        }),
        addMessageTemplateSMSByTemplate: builder.mutation({
            query: smstemplate => ({
                url: '/messagetemplate/sms-by-template/',
                method: 'POST',
                body: { ...smstemplate }
            }),
            invalidatesTags: ['smstemplate'],
        }),
    })
})

export const { 
    useGetMessageTemplateListQuery,
    useGetMessageTemplateIDQuery,
    useAddMessageTemplateMutation,
    useAddMessageTemplateSMSByTemplateMutation,
    useUpdateMessageTemplateMutation,
} = messageTemplateApiSlice;