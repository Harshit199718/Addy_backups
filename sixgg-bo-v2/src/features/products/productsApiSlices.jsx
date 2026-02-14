import { apiSlice } from "../../data/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["products"],
    endpoints: builder => ({
        getProductsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/products/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['products']
        }),
        addProducts: builder.mutation({
            query: product => ({
                url: '/products/',
                method: 'POST',
                body: { ...product }
            }),
            invalidatesTags: ['products'],
        }),
        batchAddProducts: builder.mutation({
            query: product => ({
                url: '/products/batchcreate/',
                method: 'POST',
                body: { ...product }
            }),
            invalidatesTags: ['products'],
        }),
        updateProducts: builder.mutation({
            query: product => ({
                url: `/products/${product.id}/`,
                method: 'PUT',
                body: { ...product }
            }),
            invalidatesTags: ['products'],
        }),
        batchUpdateProducts: builder.mutation({
            query: product => ({
                url: `/products/batchupdate/?filter={"id": [${envvar.ids}]}/`,
                method: 'PUT',
                body: { ...product }
            }),
            invalidatesTags: ['products'],
        }),
        getProductsID: builder.query({
            query: ({ id }) => ({
                url: `/products/${id}/`,
            }),
            providesTags: ['products']
        }),
        getProductOptions: builder.query({
            query: ({ filters }) => ({
                url: `/products/?filter=${JSON.stringify(filters)}`,
            }),
            providesTags: ['products']
        }),
        addProductsBOAccess: builder.mutation({
            query: products => ({
                url: '/products/nex4d_BO_Link/',
                method: 'POST',
                body: { ...products }
            }),
            invalidatesTags: ['products'],
        }),
        switchProducthModule: builder.mutation({
            query: products => ({
                url: '/product/switch/',
                method: 'POST',
                body: { ...products }
            }),
            invalidatesTags: ['products'],
        }),
    })
})

export const { 
    useGetProductsListQuery,
    useGetProductsIDQuery,
    useAddProductsMutation,
    useBatchAddProductsMutation,
    useAddProductsBOAccessMutation,
    useUpdateProductsMutation,
    useBatchUpdateProductsMutation,
    useGetProductOptionsQuery,
    useSwitchProducthModuleMutation,
} = productsApiSlice;