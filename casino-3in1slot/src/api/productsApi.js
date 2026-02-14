import { setGlobalError } from "../app/slices/general";
import { api, onQueryStartedErrorToast } from "./api";
import { getDeviceUrl } from "./apiContants";


export const productsApi = api.injectEndpoints({
  reducerPath: "productsApi",
  tagTypes: ['Started'],
  endpoints: (builder) => ({

    // getProducts
    getProducts: builder.mutation({
      query: ({category, id, direct, featured}) => {
        // For normal product
        let url=`products/?category=${category}`;
        // For Hot Games List URL
        if(category === "hotgameslist"){
          return url=`hotgames/`
        }
        
        if (direct) {
          return url=`products/?category=${category}&id=${id}&direct=true`
        }

        if (featured) {
          return url=`products/?featured=true`
        }
        return url
      }
    }),

    // get Game list
    getGameList: builder.mutation({
      query: ({name, category}) => `product/${name.toLowerCase()}/games/${(category==="fishing")?"fish":""}?_start=0&_end=521`,
      onQueryStarted: onQueryStartedErrorToast,
    }),

    // getDirectProducts
    directProducts: builder.query({
      query: () => ({
        url: `products/?direct=true`
      })
    }),

    // get started games
    getStartedGames: builder.query({
      query: (id) => `user-game-account/${id}/`,
      providesTags: ['Started']
    }),

    // Stop Product
    stopProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}/stop/`,
        method: "POST"
      }),
      invalidatesTags: ['Started', 'Wallet']
    }),

    // Stop All Products
    stopAllProducts: builder.mutation({
      query: () => ({
        url: `/games/stop/`,
        method: "POST"
      }),
      invalidatesTags: ['Started', 'Wallet']
    }),

    // Start Product
    startProduct: builder.mutation({
      query: ({id, credit_type, amount, auto_transfer}) => ({
        url: `product/${id}/start/?credit_type=${credit_type}${auto_transfer?`&amount=${amount}`:''}`,
        method: "POST"
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let win
        if ((args.ltype==="h5") && !args?.baseProduct?.is_launch_in_site) {
          win = window.open('about:blank')
        }
        try {
          const {data} = await queryFulfilled;
          if ((args.ltype==="h5") && !args?.baseProduct?.is_launch_in_site) {
            const h5Url = data?.url?.url || data?.url
            win.location = h5Url
          }
        } catch (error) {
          if ((args.ltype==="h5") && !args?.baseProduct?.is_launch_in_site) {
            win.close();
          }
          let message=""
          if (error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error) {
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
      transformResponse: (response, _, args) => {
        const {username, password, name} = response;
        let updatedResponse={gameid: args.id, ...response};
        const url = getDeviceUrl(name, username, password);
        if (args.ltype==="app") {
          if (response.module !== "easytogo123") {
            updatedResponse={
              ...response,
              url: {
                android: [args.android_dl_link],
                ios: [args.ios_dl_link],
              },
              androidUrl: url,
              ios32Url: url,
              ios64Url: url,
            }
          }
        }
        return updatedResponse
      },
      invalidatesTags: ['Started', 'Wallet']
    }),

    updateAutoTransfer: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `update-autotransfer/${id}/`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['Wallet']
    }),

    // Start Easy Product
    startEasyProduct: builder.mutation({
      query: ({id, gameid, credit_type, name, auto_transfer, amount}) => {
        let url=`product/${name}/start/${id}/?credit_type=${credit_type}${auto_transfer?`&amount=${amount}`:''}`
        if (name==="easytogo") {
          url=`product/${name}/start/${id}/${gameid}/?credit_type=${credit_type}${auto_transfer?`&amount=${amount}`:''}`
        }
        return { url, method: "POST"}
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let win
        if ((args.ltype==="h5") && !args?.baseProduct?.is_launch_in_site) {
          win = window.open('about:blank')
        }
        try {
          const {data} = await queryFulfilled;
          if ((args.ltype==="h5") && !args?.baseProduct?.is_launch_in_site) {
            const h5Url = data?.url?.url || data?.url
            win.location = h5Url
          }
        } catch (error) {
          win.close();
          let message=""
          if (error?.error?.data?.detail || error?.error?.data?.error || error?.error?.error) {
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
      transformResponse: (response, _, args) => {
        return {gameid: args.id, ...response};
      },
      invalidatesTags: ['Started', 'Wallet']
    }),

    // Change Game ID
    changeId: builder.mutation({
      query: (id) => {
        return { url: `changegameid/${id}`, method: "PUT"}
      },
      invalidatesTags: ['Started']
    }),

    // Search Game
    searchGame: builder.mutation({
      query: ({name, query}) => `product/${name?.toLowerCase()}/games/?search=${query}&_start=0&_end=521`,
    }),
  }),
});