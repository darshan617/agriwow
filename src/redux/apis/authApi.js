import React from "react";
import { apiSlice } from "../apiSlice";
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/login",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/register",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
