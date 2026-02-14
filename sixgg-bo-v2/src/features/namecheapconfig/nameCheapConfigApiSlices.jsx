import { apiSlice } from "../../data/api/apiSlice";

export const nameCheapConfigApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["namecheapconfig"],
    endpoints: builder => ({
        getNamecheapConfigList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/fe/domain/namecheap/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['namecheapconfig']
        }),
        addNamecheapConfig: builder.mutation({
            query: namecheapconfig => ({
                url: '/fe/domain/namecheap/',
                method: 'POST',
                body: { ...namecheapconfig }
            }),
            invalidatesTags: ['namecheapconfig'],
        }),
        updateNamecheapConfig: builder.mutation({
            query: namecheapconfig => ({
                url: `/fe/domain/namecheap/${namecheapconfig.id}/`,
                method: 'PUT',
                body: { ...namecheapconfig }
            }),
            invalidatesTags: ['namecheapconfig'],
        }),
        getNamecheapConfigID: builder.query({
            query: ({ id }) => ({
                url: `/fe/domain/namecheap/${id}/`,
            }),
            providesTags: ['namecheapconfig']
        }),
        namecheapSetCustomDNS: builder.mutation({
            query: namecheapconfig => ({
                url: `/fe/domain/namecheap/setcustomdns/`,
                method: 'POST',
                body: { ...namecheapconfig }
            }),
            invalidatesTags: ['namecheapconfig'],
        }),
    })
})

export const { 
    useGetNamecheapConfigListQuery,
    useGetNamecheapConfigIDQuery,
    useAddNamecheapConfigMutation,
    useUpdateNamecheapConfigMutation,
    useNamecheapSetCustomDNSMutation
} = nameCheapConfigApiSlice;