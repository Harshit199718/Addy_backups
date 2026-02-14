import { apiSlice } from "../../data/api/apiSlice";

export const exportExcelApiSlices = apiSlice.injectEndpoints({
    tagTypes: ["exportexcel"],
    endpoints: builder => ({
        getExportExcelList: builder.query({
            query: ({ module, pagination, filters, sorting }) => ({
                url: `/${module}/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['exportexcel']
        }),
        getExportExcelListField: builder.query({
            query: ({ module, pagination, filters, sorting }) => ({
                url: `/${module}/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['exportexcel']
        }),
    })
})

export const { 
    useGetExportExcelListQuery,
    useGetExportExcelListFieldQuery,
    useLazyGetExportExcelListQuery,
    useLazyGetExportExcelListFieldQuery,
} = exportExcelApiSlices;