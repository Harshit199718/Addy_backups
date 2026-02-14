import { api, onQueryStartedErrorToast } from "./api";
import { setGlobalError } from "../app/slices/general";

export const transactionsApi = api.injectEndpoints({
  reducerPath: "transactionsApi",
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    // Login
    merchantBanks: builder.query({
      query: (rank) =>
        rank
          ? `merchant-bank-accounts/?ranks=${rank}`
          : "merchant-bank-accounts/",
    }),
    easypayBanks: builder.query({
      query: () => `easypay/banklist/manual_deposit/`
    }),
    getHistory: builder.query({
      query: (type) => ({
        url: `${type}/`,
        method: "GET",
      }),
    }),
    transactions: builder.query({
      query: () => "actors/transactions/",
      providesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `actors/transactions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
    chips: builder.query({
      query: () => "chips/",
    }),
    rewards: builder.query({
      query: () => "rewards/",
    }),
    transfers: builder.query({
      query: () => "transfers/",
    }),
    deposit: builder.mutation({
      query: (payload) => ({
        url: "deposits/",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let win
        if (args?.pg === "dgpay" || args?.pg=== "gspay" || args?.pg === "quickpay" || args?.pg === "quickpay-ewallet") {
          win = window.open('about:blank')
        }
        try {
          const { data } = await queryFulfilled;
          const submitBankData = (action, type) => {
            let url = action.url;
            if (type === "dgpay" || type === "quickpay" || type === "quickpay-ewallet") {
              url = action;
            }
            if (type === "gspay" || type === "sun2pay") {
              url = JSON.parse(action.data)[0].payment_url;
            }
            if (args?.pg === "dgpay" || args?.pg=== "gspay" || args?.pg === "quickpay" || args?.pg === "quickpay-ewallet") {
              win.location = url;
            } else {
              submitForm(url, action.data);
            }
          };
          const submitForm = (url, data) => {
            const bankdata = data;
            const form = document.createElement("form");
            form.method = "POST";
            form.action = url;
            form.style.display = "none"; // Hide the form
        
            // Add input elements for each bankdata key-value pair
            Object.entries(bankdata).forEach(([key, value]) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = value;
              form.appendChild(input);
            });
        
            // Append the form to the body, submit it, and remove it
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          };
          if(data?.action){
            submitBankData(data?.action, args?.pg);
          } else {
            if (win) {
              win.close();
            }
          }
        } catch (error) {
          if(win){
            win.close()
          }
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
      }
    }),
    minDeposit: builder.query({
      query: () => "wallet/min_deposit_and_min_turnover/",
      transformResponse: (response) => response[0],
    }),
    banks: builder.query({
      query: (id) => id?`banks/${id}/`:`banks/`,
    }),
    withdraw: builder.mutation({
      query: (payload) => ({
        url: "withdrawals/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Transactions"],
    }),
    merchantEwallets: builder.query({
      query: (provider) => `merchant-ewallet-accounts/?ewallet_provider=${provider}`,
    }),
  }),
});