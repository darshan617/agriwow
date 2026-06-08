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
    googleLogin: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/google-login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        };
      },
    }),
  }),
});
export const { useAuthMutation, useVerifyOtpMutation, useGoogleLoginMutation } =
  authApi;
