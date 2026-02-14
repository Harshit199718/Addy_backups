import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// Base Query header 
const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('access') || null;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers
    }
})

// Refresh Token
const baseQueryWithReauth = async (args, api, extraOptions) => {
    const token = localStorage.getItem('access') || null;

    if (token) {
        try {
            const refresh = localStorage.getItem('refresh') || null;
            const decodedToken = jwtDecode(token);
            const tokenExpirationTime = decodedToken.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const tokenRemainingTime = tokenExpirationTime - currentTime;
            // Refresh Token 
            if(tokenRemainingTime < 60){
                const request = await new Request(apiUrl + 'token/refresh/', {
                    method: 'POST',
                    body: JSON.stringify({ refresh }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                    const response = await fetch(request);
                    const auth = await response.json();
                    if (response.status < 200 || response.status >= 300) {
                        api.dispatch(logOut())
                    }
                    api.dispatch(setCredentials({ ...auth}))
                    
            }
        } catch (error) {
            api.dispatch(logOut())
        }
    }

    let result = await baseQuery(args, api, extraOptions);
    if(!(args?.url === "/token/") && (result?.error?.status === 401 || result?.error?.status === 403) ){
        api.dispatch(logOut())
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});