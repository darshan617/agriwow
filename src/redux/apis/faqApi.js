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
            askQuestion: builder.mutation({
                query: ({body}) => ({
                    url: '/product-question',
                    method: 'POST',
                    body: body,
                }),
                invalidatesTags: ['askQuestion'],
            }),
        }),
    })


    export const { useGetFaqsQuery, useAskQuestionMutation } = faqApi