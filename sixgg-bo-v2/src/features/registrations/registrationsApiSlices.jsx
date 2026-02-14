import { apiSlice } from "../../data/api/apiSlice";

export const registrationsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["registrations"],
    endpoints: builder => ({
        getRegistrationsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/registrations/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['registrations']
        }),
    })
})

export const { 
    useGetRegistrationsListQuery,
    useGetRegistrationsIDQuery,
} = registrationsApiSlice;