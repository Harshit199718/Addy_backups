import { apiSlice } from "../../data/api/apiSlice";

export const reportsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["reports"],
    endpoints: builder => ({
        getDailyTotalSalesSummary: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/daily` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getPaymentGatewaySummary: builder.query({
            query: ({ filters }) => ({
                url: `/transactions/paymentgateway_summary` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getEWalletSummary: builder.query({
            query: ({ filters }) => ({
                url: `/transactions/ewallet_summary` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getNewIDSummary: builder.query({
            query: ({ filters }) => ({
                url: `/transactions/newid_summary` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getBonusSummary: builder.query({
            query: ({ filters }) => ({
                url: `/bonuses/bonus_summary` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportOperatorWallet: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/support/balance` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getDailyTurnover: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/daily/turnover` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getCashTransferSummary: builder.query({
            query: ({ filters }) => ({
                url: `/cash` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getLastDeposit: builder.query({
            query: ({ filters }) => ({
                url: `/reports/rawsql/lastdeposit` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getNoDeposit: builder.query({
            query: ({ filters }) => ({
                url: `/reports/rawsql/xdeposit` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getDailySummary: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/daily/dates` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportMarketing: builder.query({
            query: ({ filters }) => ({
                url: `/reports/rawsql/retention` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportDepositRank: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/deposit/rank` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportRegistrationDeposit: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/registration/deposit` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportRiskManagementIdenticalPassword: builder.query({
            query: ({ filters }) => ({
                url: `/reports/riskmanagement/samepassword` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportRiskManagementIdenticalIPAddress: builder.query({
            query: ({ filters }) => ({
                url: `/reports/riskmanagement/sameipaddress` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getReportTransactions: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/rawsql/report/transactions` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count'))}
            },
            providesTags: ['reports']
        }),
        getReportDepositWithdrawal: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/rawsql/report/transactions/deposit_withdrawal` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getSiteTransactions: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/rawsql/report/site/transactions` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getSiteTransactionsDetails: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/rawsql/report/site/transactions/details` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getTopReferrer: builder.query({
            query: ({ filters }) => ({
                url: `/jqk/rawsql/report/referrer` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getPromotionAnalysis: builder.query({
            query: ({ filters }) => ({
                url: `/reports/rawsql/promotionanalysis` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getSummaryByTType: builder.query({
            query: ({ filters }) => ({
                url: `/transactions/summary_by_ttype` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
        getBalanceSummary: builder.query({
            query: ({ filters }) => ({
                url: `/rawsql/summary/support/balance_summarytable` +
                `?filter=${JSON.stringify(filters)}`,
            }),
            transformResponse(list, meta) {
                return { list, totalCount: Number(meta.response.headers.get('X-Total-Count')) }
            },
            providesTags: ['reports']
        }),
    })
})

export const { 
    useGetDailyTotalSalesSummaryQuery,
    useGetPaymentGatewaySummaryQuery,
    useGetEWalletSummaryQuery,
    useGetNewIDSummaryQuery,
    useGetBonusSummaryQuery,
    useGetReportOperatorWalletQuery,
    useGetDailyTurnoverQuery,
    useGetCashTransferSummaryQuery,
    useGetLastDepositQuery,
    useGetNoDepositQuery,
    useGetDailySummaryQuery,
    useGetReportMarketingQuery,
    useGetReportDepositRankQuery,
    useGetReportRegistrationDepositQuery,
    useGetReportRiskManagementIdenticalPasswordQuery,
    useGetReportRiskManagementIdenticalIPAddressQuery,
    useGetReportTransactionsQuery,
    useGetReportDepositWithdrawalQuery,
    useGetSiteTransactionsQuery,
    useGetSiteTransactionsDetailsQuery,
    useGetTopReferrerQuery,
    useGetPromotionAnalysisQuery,
    useGetSummaryByTTypeQuery,
    useGetBalanceSummaryQuery
} = reportsApiSlice;