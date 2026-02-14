import { api, onQueryStartedErrorToast } from "./api";


export const promotionsApi = api.injectEndpoints({
  reducerPath: "promotionsApi",
  tagTypes: ['CTCPromos', 'CTCGroups', 'CPCPromos'],
  endpoints: (builder) => ({

    // Promotions
    promotions: builder.query({
      query: () => "promotions/"
    }),

    // Promotions Tabs
    promotionsTabs: builder.query({
      query: () => "promotions/promo_tabs/"
    }),

    // Get Deposit Promotions
    getDepositPromotions: builder.query({
      query: () => "promotions/deposit_promotion_list/",
      transformResponse: (response) => {
        return response?.sort((promoA, promoB)=> promoA.id - promoB.id)?.filter(promo=> promo?.other?.applicable)
      }
    }),

    // CTC Promotions
    getCTC: builder.query({
      query: (isReward) => isReward?"ctc/reward/":"clicktoclaims/",
      providesTags: ["CTCPromos"]
    }),

    // CPC Promotions
    getCPC: builder.query({
      query: () => "ctc/classicpromo/",
      providesTags: ["CPCPromos"]
    }),

    // Promotions Groups
    getPromoGroups: builder.query({
      query: () => "promotiongroups/",
      providesTags: ["CTCGroups"]
    }),

    // Click To Claim
    claimCTC: builder.mutation({
      query: ({id, isReward}) => ({
        url: "clicktoclaims/",
        method: "POST",
        body: {id}
      }),
      invalidatesTags: ["CTCPromos", 'Wallet', "CPCPromos"]
    }),

    // Click To Claim (Coupon)
    claimCTCCoupon: builder.mutation({
      query: ctccoupon => ({
        url: "rewards/coupon/",
        method: "POST",
        body: { ...ctccoupon }
      }),
      // onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["CTCPromos", 'Wallet', 'CPCPromos']
    }),
  }),
});