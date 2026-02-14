import { apiSlice } from "../../data/api/apiSlice";

export const supportsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["2FA"],
    endpoints: builder => ({
        get2FAQRCode: builder.query({
            query: () => ({
                url: `/agent/enable-2fa/`,
            }),
            providesTags: ['2FA']
        }),
        verify2FAQRCode: builder.mutation({
            query: totp => ({
                url: '/agent/confirm-totp/',
                method: 'POST',
                body: { ...totp }
            }),
            invalidatesTags: ['supports'],
        }),
    })
})

export const { 
    useLazyGet2FAQRCodeQuery,
    useVerify2FAQRCodeMutation
} = supportsApiSlice;