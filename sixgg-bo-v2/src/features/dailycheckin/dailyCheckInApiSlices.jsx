import { apiSlice } from "../../data/api/apiSlice";

export const dailyCheckInApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["dailycheckin"],
    endpoints: builder => ({
        getDailyCheckList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/dailycheckin/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['dailycheckin']
        }),
        addDailyCheckIn: builder.mutation({
            query: dailycheckin => ({
                url: '/dailycheckin/',
                method: 'POST',
                body: { ...dailycheckin }
            }),
            invalidatesTags: ['dailycheckin'],
        }),
        updateDailyCheckIn: builder.mutation({
            query: dailycheckin => ({
                url: `/dailycheckin/${dailycheckin.id}/`,
                method: 'PUT',
                body: { ...dailycheckin }
            }),
            invalidatesTags: ['dailycheckin'],
        }),
        getDailyCheckInID: builder.query({
            query: ({ id }) => ({
                url: `/dailycheckin/${id}/`,
            }),
            providesTags: ['dailycheckin']
        }),
    })
})

export const { 
    useGetDailyCheckListQuery,
    useGetDailyCheckInQuery,
    useAddDailyCheckInMutation,
    useUpdateDailyCheckInMutation
} = dailyCheckInApiSlice;