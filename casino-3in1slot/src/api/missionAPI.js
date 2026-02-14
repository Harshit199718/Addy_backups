import { api, onQueryStartedErrorToast } from "./api";


export const missionApi = api.injectEndpoints({
  reducerPath: "missionAPI",
  tagTypes: ['mission'],
  endpoints: (builder) => ({
    // Missions
    getMissions: builder.query({
      query: () => "missions/",
      providesTags: ['mission']
    }),

    // Mission Claim
    claimMission: builder.mutation({
      query: ({id}) => ({
        url: "ctc/mission/",
        method: "POST",
        body: {id}
      }),
      invalidatesTags: ["mission", "Wallet"]
    }),
  }),
});