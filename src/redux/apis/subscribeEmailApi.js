import { apiSlice } from "../apiSlice";

const subscribeEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribeEmail: builder.mutation({
      query: ({ body }) => ({
        url: "/subscribe-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscribeEmail"],
    }),
  }),
});

export const { useSubscribeEmailMutation } = subscribeEmailApi;
