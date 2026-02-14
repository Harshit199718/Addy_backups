import { apiSlice } from "../../data/api/apiSlice";

export const permissionsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["permissions"],
    endpoints: builder => ({
        getPermissionsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/permissions/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['permissions']
        }),
        addPermissions: builder.mutation({
            query: permissions => ({
                url: '/permissions/',
                method: 'POST',
                body: { ...permissions }
            }),
            invalidatesTags: ['permissions'],
        }),
        updatePermissions: builder.mutation({
            query: permissions => ({
                url: `/permissions/${permissions.id}/`,
                method: 'PUT',
                body: { ...permissions }
            }),
            invalidatesTags: ['permissions'],
        }),
        getPermissionsID: builder.query({
            query: ({ id }) => ({
                url: `/permissions/${id}/`,
            }),
            providesTags: ['permissions']
        }),
    })
})

export const { 
    useGetPermissionsListQuery,
    useGetPermissionsIDQuery,
    useAddPermissionsMutation,
    useUpdatePermissionsMutation,
} = permissionsApiSlice;