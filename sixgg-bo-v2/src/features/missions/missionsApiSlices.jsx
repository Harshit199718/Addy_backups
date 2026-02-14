import { apiSlice } from "../../data/api/apiSlice";

export const missionsApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["missions"],
    endpoints: builder => ({
        getMissionsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/missions/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['missions']
        }),
        addMissions: builder.mutation({
            query: missions => ({
                url: '/missions/',
                method: 'POST',
                body: { ...missions }
            }),
            invalidatesTags: ['missions'],
        }),
        updateMissions: builder.mutation({
            query: missions => ({
                url: `/missions/${missions.id}/`,
                method: 'PUT',
                body: { ...missions }
            }),
            invalidatesTags: ['missions'],
        }),
        getMissionsID: builder.query({
            query: ({ id }) => ({
                url: `/missions/${id}/`,
            }),
            providesTags: ['missions']
        }),
        getMissionEligible: builder.query({
            query: ({ filters }) => ({
                url: `/mission_player/check` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            providesTags: ['mission_player']
        }),
    })
})

export const { 
    useGetMissionsListQuery,
    useGetMissionsIDQuery,
    useAddMissionsMutation,
    useUpdateMissionsMutation,
    useLazyGetMissionEligibleQuery,
} = missionsApiSlices;