import { apiSlice } from "../../data/api/apiSlice";

export const envVarApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["environmentvariables"],
    endpoints: builder => ({
        getEnvironmentVariablesList: builder.query({
            query: ({ pagination, filters, sorting }) => ({
                url: `/environmentvariables/` +
                `?_start=${pagination.startPageRow}&_end=${pagination.endPageRow}` +
                (sorting && (sorting.order && sorting.name )? `&_sort=${sorting.name}&_order=${sorting.order}` : '') +
                `&filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['environmentvariables']
        }),
        getEnvironmentVariablesModulesList: builder.query({
            query: () => ({
                url: `/environmentvariables/get-module/`,
            }),
            providesTags: ['environmentvariables']
        }),
        addEnvironmentVariables: builder.mutation({
            query: envvar => ({
                url: '/environmentvariables/',
                method: 'POST',
                body: { ...envvar }
            }),
            invalidatesTags: ['environmentvariables'],
        }),
        batchAddEnvironmentVariables: builder.mutation({
            query: envvar => ({
                url: '/environmentvariables/batchcreate/',
                method: 'POST',
                body: { ...envvar }
            }),
            invalidatesTags: ['environmentvariables'],
        }),
        updateEnvironmentVariables: builder.mutation({
            query: envvar => ({
                url: `/environmentvariables/${envvar.id}/`,
                method: 'PUT',
                body: { ...envvar }
            }),
            invalidatesTags: ['environmentvariables'],
        }),
        batchUpdateEnvironmentVariables: builder.mutation({
            query: envvar => ({
                url: `/environmentvariables/batchupdate/?filter={"id": [${envvar.ids}]}/`,
                method: 'PUT',
                body: { ...envvar }
            }),
            invalidatesTags: ['environmentvariables'],
        }),
        deleteEnvironmentVariables: builder.mutation({
            query: envvar => ({
                url: `/environmentvariables/${envvar.id}/`,
                method: 'DELETE',
                body: { ...envvar }
            }),
            invalidatesTags: ['environmentvariables'],
        }),
        getEnvironmentVariablesID: builder.query({
            query: ({ id }) => ({
                url: `/environmentvariables/${id}/`,
            }),
            providesTags: ['environmentvariables']
        }),
    })
})

export const { 
    useGetEnvironmentVariablesListQuery,
    useLazyGetEnvironmentVariablesListQuery,
    useGetEnvironmentVariablesModulesListQuery,
    useGetEnvironmentVariablesIDQuery,
    useAddEnvironmentVariablesMutation,
    useBatchAddEnvironmentVariablesMutation,
    useBatchUpdateEnvironmentVariablesMutation,
    useUpdateEnvironmentVariablesMutation,
    useDeleteEnvironmentVariablesMutation
} = envVarApiSlice;