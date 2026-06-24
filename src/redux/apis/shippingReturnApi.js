import React from 'react'
import { apiSlice } from '../apiSlice'
// import { headers } from '@/utils/headers'

const shippingReturnApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShippingReturn: builder.query({
            query: () => ({
                url: '/shipping-return',
                method: 'GET',
                // headers: headers(),
            }),
            providesTags: ['shippingReturn'],
        }),
    }),
})

export const { useGetShippingReturnQuery } = shippingReturnApi