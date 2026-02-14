import { apiSlice } from "../../../data/api/apiSlice";

export const bonusApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["bonus"],
    endpoints: builder => ({
        bonusCreate: builder.mutation({
            query: bonus => ({
                url: `/bonuses/`,
                method: 'POST',
                body: { ...bonus }
            }),
            invalidatesTags: ['deposit', 'transactions', 'general', 'players'],
        }),
        bonusAction: builder.mutation({
            query: bonus => ({
                url: `/bonuses/${bonus.id}/`,
                method: 'PUT',
                body: { ...bonus }
            }),
            invalidatesTags: ['bonus', 'transactions', 'general', 'players'],
        }),
    })
})

export const { 
    useBonusCreateMutation,
    useBonusActionMutation,
} = bonusApiSlice;