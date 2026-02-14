import { apiSlice } from "../../data/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["users"],
    endpoints: builder => ({
        getUsersList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/users/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['users']
        }),
        getAgentsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/users/agents/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['users']
        }),
        getUsersID: builder.query({
            query: ({ id }) => ({
                url: `/users/${id}/`,
            }),
            providesTags: ['users']
        }),
    })
})

export const { 
    useGetUsersListQuery,
    useGetAgentsListQuery,
    useGetUsersIDQuery,
} = usersApiSlice;