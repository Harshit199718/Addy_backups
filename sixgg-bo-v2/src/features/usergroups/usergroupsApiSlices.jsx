import { apiSlice } from "../../data/api/apiSlice";

export const userGroupsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["usergroups"],
    endpoints: builder => ({
        getUserGroupsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/usergroups/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['usergroups']
        }),
        addUserGroups: builder.mutation({
            query: usergroups => ({
                url: '/usergroups/',
                method: 'POST',
                body: { ...usergroups }
            }),
            invalidatesTags: ['usergroups'],
        }),
        updateUserGroups: builder.mutation({
            query: usergroups => ({
                url: `/usergroups/${usergroups.id}/`,
                method: 'PUT',
                body: { ...usergroups }
            }),
            invalidatesTags: ['usergroups'],
        }),
        getUserGroupsID: builder.query({
            query: ({ id }) => ({
                url: `/usergroups/${id}/`,
            }),
            providesTags: ['usergroups']
        }),
    })
})

export const { 
    useGetUserGroupsListQuery,
    useGetUserGroupsIDQuery,
    useAddUserGroupsMutation,
    useUpdateUserGroupsMutation
} = userGroupsApiSlice;