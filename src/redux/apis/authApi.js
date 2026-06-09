import Cookies from "js-cookie";
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
    logout: builder.mutation({
      query: () => {
        const userToken = Cookies.get("userToken");
        return {
          url: "/logout",
          method: "POST",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["auth"],
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
      invalidatesTags: ["auth"],
    }),
    resendOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/resend-otp",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});
export const {
  useAuthMutation,
  useVerifyOtpMutation, useLogoutMutation,
  useGoogleLoginMutation,
  useResendOtpMutation,
} = authApi;
