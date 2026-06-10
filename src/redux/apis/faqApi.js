    import React from 'react'
    import { apiSlice } from '../apiSlice'

    const faqApi = apiSlice.injectEndpoints({
        endpoints: (builder) => ({  
            getFaqs: builder.query({
                query: () => ({
                    url: '/faqs',
                    method: 'GET',
                }),
                providesTags: ['faqs'],
            }),
        }),
    })


    export const { useGetFaqsQuery } = faqApi