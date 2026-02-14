import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCurrentUser } from '../app/slices/userSlice';
import { setGlobalError } from '../app/slices/general';
import { getDeviceIdentifier, getLocalStorageExpiry, setLocalStorageExpiry } from '../utils/helper';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const onQueryStartedErrorToast = async (args, { dispatch, queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    // handle error here, dispatch toast message
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
    // store.dispatch()
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const user = JSON.parse(localStorage.getItem("user"))
    let token = user?user.access:""
    // Fingerprint
    let deviceID = ""
    if(token) {
      const cachedDeviceID = getLocalStorageExpiry('deviceID')
      const state = api.getState()
      // if deviceID is not cached, generate a new one and store it in local storage
      if(!state?.user?.stealthLogin){
        if(cachedDeviceID){
            deviceID = cachedDeviceID 
        } else {
            deviceID = await getDeviceIdentifier()
            setLocalStorageExpiry('deviceID', deviceID, 86400000);
        }
      }
    }
    if((args?.url === "wallet/" || args?.url === "customer-bank-accounts/" || args === "customer-bank-accounts/" || args === "wallet/min_deposit_and_min_turnover/") && !token){
      return null
    }
    const baseQuery = fetchBaseQuery({ 
      baseUrl: `${API_URL}/app/api/`,
      prepareHeaders: (headers) => {
        // const token = getToken();
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
          if (!headers.has("Browser-Finger-Print") && deviceID) {
            headers.set('Browser-Finger-Print', `${deviceID}`);
          }
        }
        return headers;
      }
    });

    let result = await baseQuery(args, api, extraOptions);

    // Check for specific 401 error and message
    if (result?.error && result?.error?.status === 401 && (result?.error?.data?.code === 'token_not_valid' || result?.error?.data?.code === 'user_not_found')) {
      // Perform token refresh
      try {
        const refreshResult = await baseQuery({ url: 'token/refresh/', method: 'POST', body: {refresh: user?.refresh} }, api, extraOptions);
        if (refreshResult.error && refreshResult.error.status === 401 && (refreshResult.error.data?.code === 'token_not_valid' || refreshResult.error.data?.code === 'user_not_found')) {
          localStorage.removeItem("user")
          api.dispatch(setCurrentUser(null));
          location.reload();
          return { error: { status: 401, error: 'Token refresh failed' } };
        } else if (refreshResult.data) {
          // Update the token in your state or headers
          const user = JSON.parse(localStorage.getItem("user"))
          user.access = refreshResult.data.access
          localStorage.setItem("user", JSON.stringify(user))
          token=refreshResult.data.access
          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem("user")
          api.dispatch(setCurrentUser(null));
          location.reload();
        }
      } catch(error) {
        localStorage.removeItem("user")
        api.dispatch(setCurrentUser(null));
        location.reload();
      }
    }

    return result;
  },
  endpoints: () => ({
  })
})