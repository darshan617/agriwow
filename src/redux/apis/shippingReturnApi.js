import React from 'react'
import { apiSlice } from '../apiSlice'

const shippingReturnApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShippingReturn: builder.query({
            query: () => ({
                url: '/shipping-return',
                method: 'GET',
            }),
            providesTags: ['shippingReturn'],
        }),
    }),
})

export const { useGetShippingReturnQuery } = shippingReturnApi