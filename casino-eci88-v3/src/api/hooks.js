import { generalApi } from "./generalApi";
import { missionApi } from "./missionAPI";
import { productsApi } from "./productsApi";
import { promotionsApi } from "./promotionsApi";
import { transactionsApi } from "./transactionsApi";
import { authApi } from "./userApi";

export const {
  useGetNoticesQuery,
  useSkinConfigQuery,
  useGetDownlineQuery,
  useGetCommissionQuery,
  useGetLaporanQuery,
  useGetCheckinsQuery,
  useClaimCheckinMutation,
  useGetSlotsQuery,
  useSpinWheelMutation,
  useGetRebateQuery,
  useClaimRebateMutation,
  useGetTokensQuery,
  useGetSocialsQuery,
  useGetNewsFeedsQuery,
  useGetPartnershipsQuery,
  useGetLastDepositsQuery,
  useGetLastWithdrawlsQuery,
  useGetEnvVarInfoQuery,
  useGetPWAConfigQuery,
  useDownloadPWAMutation,
} = generalApi;
export const {
  useGetProductsMutation,
  useDirectProductsQuery,
  useGetGameListMutation,
  useGetStartedGamesQuery,
  useStopProductMutation,
  useStopAllProductsMutation,
  useStartProductMutation,
  useStartEasyProductMutation,
  useChangeIdMutation,
  useSearchGameMutation,
  useUpdateAutoTransferMutation
} = productsApi;
export const {
  usePromotionsQuery,
  usePromotionsTabsQuery,
  useGetDepositPromotionsQuery,
  useGetCTCQuery,
  useGetCPCQuery,
  useGetPromoGroupsQuery,
  useClaimCTCMutation,
  useClaimCTCCouponMutation,
} = promotionsApi;
export const {
  useGetMissionsQuery,
  useClaimMissionMutation,
} = missionApi;
export const {
  useMerchantBanksQuery,
  useEasypayBanksQuery,
  useDepositMutation,
  useGetHistoryQuery,
  useTransactionsQuery,
  useChipsQuery,
  useRewardsQuery,
  useTransfersQuery,
  useDeleteTransactionMutation,
  useMinDepositQuery,
  useBanksQuery,
  useWithdrawMutation,
  useMerchantEwalletsQuery,
} = transactionsApi;
export const {
  useLoginMutation,
  useStealthLoginMutation,
  useRegisterMutation,
  useNewRegisterMutation,
  useVerifyLegacyMutation,
  useVerifyTacMutation,
  useActivateMutation,
  useRegisterWithBankMutation,
  useRefreshMutation,
  useLogoutMutation,
  useWalletQuery,
  useCustomerBanksQuery,
  useGetGameAccountsQuery,
  useGetGameAccountsSoccerQuery,
  useAddBankMutation,
  useResetTacMutation,
  useResetPasswordMutation,
  useRequestOTPV2Mutation,
  useVerifyResetV2Mutation,
  useResetPasswordV2Mutation,
  useChangePasswordMutation,
  useGetMailsQuery,
  useUpdateMailMutation,
  useGetBetHistoryQuery,
  useDirectRegisterMutation,
  useGetTacV3Mutation,
  useVerifyTacV3Mutation,
  useVerifyWithoutTacV3Mutation,
  useVerifyBankV3Mutation
} = authApi;
