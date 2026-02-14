import { apiSlice } from "../../data/api/apiSlice";

export const productMessageApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["productmessage"],
    endpoints: builder => ({
        getProductMessageList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/productmessage/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['productmessage']
        }),
        addProductMessage: builder.mutation({
            query: productmessage => ({
                url: '/productmessage/',
                method: 'POST',
                body: { ...productmessage }
            }),
            invalidatesTags: ['productmessage'],
        }),
        updateProductMessage: builder.mutation({
            query: productmessage => ({
                url: `/productmessage/${productmessage.id}/`,
                method: 'PUT',
                body: { ...productmessage }
            }),
            invalidatesTags: ['productmessage'],
        }),
        getProductMessageID: builder.query({
            query: ({ id }) => ({
                url: `/productmessage/${id}/`,
            }),
            providesTags: ['productmessage']
        }),
    })
})

export const { 
    useGetProductMessageListQuery,
    useGetProductMessageIDQuery,
    useAddProductMessageMutation,
    useUpdateProductMessageMutation,
} = productMessageApiSlice;