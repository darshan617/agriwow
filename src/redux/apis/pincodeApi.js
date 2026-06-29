import React from 'react'
import { apiSlice } from '../apiSlice'

const pincodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkPincode: builder.mutation({
      query: ({ body }) => {
        return {
        url: `/check-pincode`,
        method: 'POST',
          body,
        };
      },
      invalidatesTags: ["checkPincode"],
    }),
  }),
});

export const { useCheckPincodeMutation } = pincodeApi;