import { setGlobalError } from "../app/slices/general";
import { afterTacSent, setCurrentUser } from "../app/slices/userSlice";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  reducerPath: "authApi",
  tagTypes: ['Wallet', 'CustomerBanks'],
  endpoints: builder => ({
    // Login
    login:builder.mutation({
      query: (payload) => ({
        url: "token/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet", "CTCPromos", "CTCGroups"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setCurrentUser(data))
        } catch (error) {
          
        }
      },
      transformResponse: (response) => {
          localStorage.setItem("user", JSON.stringify(response))
          localStorage.removeItem("initUser");
          return response;
      }
    }),
    // Login
    stealthLogin:builder.mutation({
      query: (tokenId) => ({
        url: `stealthtoken/${tokenId}`,
        method: "GET",
      }),
      invalidatesTags: ["Wallet", "CTCPromos", "CTCGroups"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          const {data} = await queryFulfilled;
          dispatch(setCurrentUser(data))
        } catch (error) {
          
        }
      },
      transformResponse: (response) => {
          localStorage.setItem("user", JSON.stringify(response))
          localStorage.removeItem("initUser");
          return response;
      }
    }),
    // Refresh
    refresh:builder.mutation({
      query: (payload) => ({
        url: "token/refresh/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet", "CTCPromos"]
    }),
    // Logout
    logout:builder.mutation({
      query: () => ({
        url: "token/logout/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
        try {
          await queryFulfilled; 
          window?.SBF?.logout();
          SBChat.clear();
        } catch (error) {
          
        }
      },
      invalidatesTags: ["Wallet", "CTCPromos", "CTCGroups"],
    }),
    // Get Wallet
    wallet:builder.query({
      query: () => ({
        url: "wallet/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
      }),
      providesTags: ["Wallet"],
      transformResponse: (response) => {
          return response;
      }
    }),
    // Register
    // Get Tac
    tac:builder.query({
      query: (id) => ({
        url: `signup/${id}/get-tac/`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          const { data } = await queryFulfilled;
          dispatch(afterTacSent(true));
        } catch (error) {
          // Handle any errors
        }
      },
    }),
    // Signup
    register:builder.mutation({
      query: (payload) => ({
        url: "signup/",
        method: "POST",
        body: payload
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          const { data } = await queryFulfilled;
          // Directly after the mutation completes, trigger the 'tac' query
          // Assuming 'data.id' is the ID needed for the 'tac' query
          localStorage.setItem("initUser", JSON.stringify(args))
          localStorage.setItem("isNewUser", true)
          dispatch(authApi.endpoints.tac.initiate(data.id));
        } catch (error) {
          // Handle any errors
        }
      },
    }),
    // Legacy Signup
    newRegister:builder.mutation({
      query: (payload) => ({
        url: "new-signup/get-tac/",
        method: "POST",
        body: payload
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          const { data } = await queryFulfilled;
          localStorage.setItem("isNewUser", true)
          localStorage.setItem("initUser", JSON.stringify(args))
          dispatch(afterTacSent(true));
        } catch (error) {
          // Handle any errors
          let message="";
          if (error?.error?.data?.non_field_errors) {
            message = error?.error?.data?.non_field_errors[0]
          } else if (error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error) {
            message = error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error
          }
          if (message) {
            dispatch(setGlobalError({
              errorTitle: args.errorTitle,
              message
            }))
          }
        }
      },
    }),

    // Verify Lagacy TAC
    verifyLegacy:builder.mutation({
      query: ({id, tac}) => ({
        url: `/new-signup/${id}/verify-tac/`,
        method: "POST",
        body: {tac}
      }),
    }),
    
    // Verify Tac
    verifyTac:builder.mutation({
      query: ({id, tac}) => ({
        url: `signup/${id}/verify-tac/`,
        method: "POST",
        body: {tac}
      }),
    }),

    // Activate account
    activate:builder.mutation({
      query: ({id, ...payload}) => ({
        url: `signup/${id}/activate/`,
        method: "POST",
        body: payload
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          const { data } = await queryFulfilled;
          // Directly after the mutation completes, trigger the 'tac' query
          // Assuming 'data.id' is the ID needed for the 'tac' query
          const userData = JSON.parse(localStorage.getItem("initUser"))
          dispatch(authApi.endpoints.login.initiate(userData));
        } catch (error) {
          // Handle any errors
        }
      },
    }),
    // Register With Bank
    registerWithBank:builder.mutation({
      query: (payload) => ({
        url: "signup/with_bank_account/",
        method: "POST",
        body: payload
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
          localStorage.setItem("isNewUser", true)
          dispatch(authApi.endpoints.login.initiate(args));
        } catch (error) {
          // Handle any errors
        }
      },
    }),
    // Register With Bank
    directRegister:builder.mutation({
      query: (payload) => ({
        url: "signup/v3/",
        method: "POST",
        body: payload
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
          localStorage.setItem("isNewUser", true)
          dispatch(authApi.endpoints.login.initiate(args));
        } catch (error) {
          // Handle any errors
          let message="";
          if (error?.error?.data?.non_field_errors) {
            message = error?.error?.data?.non_field_errors[0]
          } else if (error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error) {
            message = error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error
          }
          if (message) {
            dispatch(setGlobalError({
              errorTitle: args.errorTitle,
              message
            }))
          }
        }
      },
    }),
    // Verify before deposit or withdraw
    getTacV3:builder.mutation({
      query: (payload) => ({
        url: "signup/get-tac-v3/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet"],
    }),
    // Verify before deposit or withdraw
    verifyTacV3:builder.mutation({
      query: (payload) => ({
        url: "signup/verify-tac-v3/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet"],
    }),
    // Verify before deposit or withdraw
    verifyWithoutTacV3:builder.mutation({
      query: (payload) => ({
        url: "signup/verify-without-otp-v3/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet"],
    }),
    // Verify Bank before deposit or withdraw
    verifyBankV3:builder.mutation({
      query: (payload) => ({
        url: "signup/activate-v3/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Wallet"],
    }),

    // Activate account
    getGameAccounts: builder.query({
      query: () => "game-accounts/?ltype=app",
    }),

    // Soccer account
    getGameAccountsSoccer: builder.query({
      query: () => "game-accounts/?product_name=soccer",
    }),

    // Get Customer Banks
    customerBanks: builder.query({
      query: () => "customer-bank-accounts/",
      providesTags: ['CustomerBanks']
    }),

    // addBank
    addBank: builder.mutation({
      query: (payload) => ({
        url: "customer-bank-accounts/",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['CustomerBanks']
    }),

    // Reset Tac
    resetTac: builder.mutation({
      query: (payload) => ({
        url: "reset-password/get-tac/",
        method: "POST",
        body: payload
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "reset-password/reset/",
        method: "POST",
        body: payload
      }),
    }),

    // Reset Password 2 request otp
    requestOTPV2: builder.mutation({
      query: (payload) => ({
        url: "reset-password/v2/get-tac/",
        method: "POST",
        body: payload
      }),
    }),

    // Reset Password 2 Verify Tac
    verifyResetV2: builder.mutation({
      query: (payload) => ({
        url: "reset-password/v2/verify-tac/",
        method: "POST",
        body: payload
      }),
    }),

    // Reset Password 2 
    resetPasswordV2: builder.mutation({
      query: (payload) => ({
        url: "reset-password/v2/reset/",
        method: "POST",
        body: payload
      }),
    }),

    // Change Password
    changePassword: builder.mutation({
      query: ({userId, payload}) => ({
        url: `change-password/${userId}/`,
        method: "PUT",
        body: payload
      }),
    }),

    // Get Mails
    getMails: builder.query({
      query: () => `mail/`,
      providesTags: ["mailbox"],
    }),

    // Update Mails
    updateMail: builder.mutation({
      query: ({id, payload}) => ({
        url: `mail/${id}/`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["mailbox"],
    }),

    // Get Bet History
    getBetHistory: builder.query({
      query: () => "user-bet-history/",
    }),
  })

})