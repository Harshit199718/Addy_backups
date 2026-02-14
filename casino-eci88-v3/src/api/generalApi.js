import { createSelector } from "@reduxjs/toolkit";
import { api, onQueryStartedErrorToast } from "./api";
import { getCurrency, updatePopupShownStatus, url_key, getPhoneFormat } from "./apiContants";
import { configurable } from "../utils/configurable";
import { formatDate } from "../utils/helper";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const generalApi = api.injectEndpoints({
  reducerPath: "generalApi",
  tagTypes: ["Checkins", "Tokens"],
  endpoints: (builder) => ({
    // Skin config
    skinConfig: builder.query({
      query: () => "skinconfig/",
      transformResponse: (response) => {
        let newRes = {};
        for (const key in response[0]) {
          if (response[0][key] && url_key.includes(key)) {
            newRes[key] = API_URL + "/media/" + response[0][key];
            continue;
          } else if (response[0][key]) {
            newRes[key] = response[0][key];
          } else {
            newRes[key] = configurable[key];
          }
        }
        newRes["currency_symbol"] = getCurrency(response[0].country);
        newRes["phone_format"] = getPhoneFormat(response[0].country);
        return newRes;
      },
    }),

    // Notices
    getNotices: builder.query({
      query: () => "notices/?active",
      transformResponse: (response) => {
        const notices={static: [], popups: []}
        response.forEach(notice => {
          if (notice.type === "static") {
            notices.static.push({...notice, image: notice.image_sm});
          } else {
              // For popups that are not meant to be shown once per session/site visit
              if (!notice.is_once) {
                const shouldAdd = updatePopupShownStatus('sessionStorage', notice.id);
                if (shouldAdd) {
                  notices.popups.push(notice);
                }
              }

              const shouldAdd = updatePopupShownStatus('localStorage', notice.id);
              if (shouldAdd) {
                notices.popups.push(notice);
              }
              // Default case for popups meant to be shown once overall
          }
        });
        return notices;
      },
    }),

    // Downline
    getDownline: builder.query({
      query: () => "downlines/players/",
      transformResponse: (response) => {
        return response.map((downline, index) => {
          const date_time = downline.date_joined.split(/T|\./);
          return {
            s_no: {
              value: index + 1,
            },
            downline: {
              value: downline?.username,
            },
            date_time: {
              value: date_time[0] + " " + date_time[1],
            },
          };
        });
      },
    }),

    // Commission
    getCommission: builder.query({
      query: () =>
        "commissions/by_player_combine_single_multilevel/?_start=0&_end=20",
      transformResponse: (response) => {
        return response.map((commission) => ({
          date: commission?.from_date,
          downline: commission?.referred_player,
          type: commission?.is_multilevel ? "Multi-Level" : "Single-Level",
          win_loss: commission?.reward_amount,
          status: commission?.state,
        }));
      },
    }),

    // Laporan
    getLaporan: builder.query({
      query: () => "commissions/by_player/?_start=0&_end=20",
      transformResponse: (response) => {
        return response.map((laporan) => ({
          date: laporan?.to_date,
          commission: laporan?.reward_amount,
        }));
      },
    }),

    // DailyCheckins
    getCheckins: builder.query({
      query: () => "daily-checkins/v2/",
      providesTags: ["Checkins"],
    }),

    // Claim DailyCheckins
    claimCheckin: builder.mutation({
      query: () => ({
        url: "daily-checkins/v2/",
        method: "POST",
      }),
      invalidatesTags: ["Checkins", "Tokens", "Wallet"],
    }),

    // Get Tokens
    getTokens: builder.query({
      query: () => "daily-checkins/v2/get_tokens/",
      providesTags: ["Tokens"],
    }),

    // Fetch Lucky Wheel Slots
    getSlots: builder.query({
      query: () => "luckywheel/",
      transformResponse: (response) => {
        return response?.map((slot) => {
          let extra = {};
          if (slot.image) {
            extra = {
              image: {
                uri: slot.image ? `${API_URL}${slot.image}` : "",
                offsetY: 200,
                sizeMultiplier: 0.5,
              },
            };
          }
          return {
            option: `${slot.description ? slot.description : slot.amount}`,
            style: { backgroundColor: slot.color, color: "#fff" },
            id: slot.id,
            show_tnc: slot?.show_tnc,
            terms_condition: slot?.terms_condition,
            ...extra,
          };
        });
      },
    }),

    // spin Lucky Wheel
    spinWheel: builder.mutation({
      query: () => "luckywheel/spin/",
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Tokens", "Wallet", "Checkins"],
      transformResponse: (response, _, args) => {
        const prizeNumber = args?.slots?.findIndex(
          (slot) => slot.id === response.id
        );
        const show_tnc = response.show_tnc;
        const terms = response.terms_condition;
        const amount = response.amount;
        return { prizeNumber, terms, amount, show_tnc };
      },
    }),

    // Get Daily Rebate
    getRebate: builder.query({
      query: () => "rewards/dailyrebate/",
      transformResponse: (response) => response[0],
    }),

    // Claim Daily Rebate
    claimRebate: builder.mutation({
      query: (payload) => ({
        url: "rewards/dailyrebate/",
        method: "POST",
        body: payload
      }),
    }),

    // Get Social Links
    getSocials: builder.query({
      query: () => "socials/",
    }),

    // Get News Feeds
    getNewsFeeds: builder.query({
      query: () => "newsfeeds/",
    }),

    // Get Partnership
    getPartnerships: builder.query({
      query: () => "partnerships/",
    }),

    // Get Last Deposits
    getLastDeposits: builder.query({
      query: () => "last-transfers/deposits/",
    }),

    // Get Last Withdrawls
    getLastWithdrawls: builder.query({
      query: () => "last-transfers/withdrawals/",
    }),

    // Get Env Var Info
    getEnvVarInfo: builder.query({
      query: () => "envvar-info/",
    }),

    // Get PWA Config
    getPWAConfig: builder.query({
      query: () => "pwaconfig/",
      transformResponse: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          let newRes = {};
          for (const key in response[0]) {
            if (response[0][key] && url_key.includes(key)) {
              newRes[key] = API_URL + "/media/" + response[0][key];
              continue;
            } else if (response[0][key]) {
              newRes[key] = response[0][key];
            } else {
              newRes[key] = configurable[key];
            }
          }
          return newRes;
        } else {
          return null;
        }
      }
    }),

    // PWA Download Coount
    downloadPWA: builder.mutation({
      query: (payload) => ({
        url: "pwaconfig/insert-download-info/",
        method: "POST",
        body: payload
      }),
    }),

  }),
});

// Selector to get specific config value
const selectSkinConfigResult = generalApi.endpoints.skinConfig.select();
export const selectConfigData = createSelector(
  (state) => selectSkinConfigResult(state),
  (skinConfig) => skinConfig?.data || configurable
);
