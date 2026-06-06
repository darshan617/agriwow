import { apiSlice } from "../apiSlice";
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/auth",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    verifyOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/verify-otp",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["verifyOtp"],
    }),
  }),
});
export const { useAuthMutation, useVerifyOtpMutation } = authApi;