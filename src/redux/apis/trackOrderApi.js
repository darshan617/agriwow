import React from 'react'
import { apiSlice } from '../apiSlice'
import Cookies from 'js-cookie'
const authHeaders = () => {
  const userToken = Cookies.get("userToken");
  return {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
};
const trackOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({        
    getTrackOrder: builder.query({
      query: ({ orderId }) => ({
        url: `/order/track/${orderId}`,
        method: "GET",
        headers: authHeaders(),
      }),
      providesTags: ["trackOrder"],

    }),
  }),
});

export const { useGetTrackOrderQuery } = trackOrderApi;