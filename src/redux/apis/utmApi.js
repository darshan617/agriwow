import React from "react";
import { apiSlice } from "../apiSlice";
import Cookies from "js-cookie";
const authHeaders = () => {
  const userToken = Cookies.get("userToken");
  return {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
};
const utmApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    utmStore: builder.mutation({
      query: ({ body }) => ({
        url: `/utm/store`,
        method: "POST",
        headers: authHeaders(),
        body: body,
      }),
      invalidatesTags: ["utm"],
    }),
  }),
});

export const { useUtmStoreMutation } = utmApi;
