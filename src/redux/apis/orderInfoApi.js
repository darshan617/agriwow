import React from 'react'
import { apiSlice } from '../apiSlice'

const orderInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderInfo: builder.query({
      query: () => ({
        url: '/features',
        method: 'GET',
      }),
      providesTags: ['orderInfo'],
    }),
  }),
})

export const { useGetOrderInfoQuery } = orderInfoApi;