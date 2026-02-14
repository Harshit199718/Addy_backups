import { apiSlice } from "../../data/api/apiSlice";

export const luckyWheelSlotsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["luckywheelslots"],
    endpoints: builder => ({
        getLuckyWheelSlotsList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/luckywheelslots/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['luckywheelslots']
        }),
        addLuckyWheelSlots: builder.mutation({
            query: luckywheelslots => ({
                url: '/luckywheelslots/',
                method: 'POST',
                body: { ...luckywheelslots }
            }),
            invalidatesTags: ['luckywheelslots'],
        }),
        updateLuckyWheelSlots: builder.mutation({
            query: luckywheelslots => ({
                url: `/luckywheelslots/${luckywheelslots.id}/`,
                method: 'PUT',
                body: { ...luckywheelslots }
            }),
            invalidatesTags: ['luckywheelslots'],
        }),
        getLuckyWheelSlotsID: builder.query({
            query: ({ id }) => ({
                url: `/luckywheelslots/${id}/`,
            }),
            providesTags: ['luckywheelslots']
        }),
    })
})

export const { 
    useGetLuckyWheelSlotsListQuery,
    useGetLuckyWheelSlotsIDQuery,
    useAddLuckyWheelSlotsMutation,
    useUpdateLuckyWheelSlotsMutation,
} = luckyWheelSlotsApiSlice;