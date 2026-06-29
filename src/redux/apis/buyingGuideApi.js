
import { apiSlice } from '../apiSlice'  
const buyingGuideApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuyingGuide: builder.query({
      query: () => ({
        url: '/subcategories',
        method: 'GET',
      }),
      providesTags: ['buyingGuide'],
    }),

    getBuyingGuideDetails: builder.query({
      query: ({ id }) => ({
        url: `/subcategories/${id}/buying-guide`,
        method: 'GET',
      }),
      providesTags: ['buyingGuideDetails'],
    }),
  }),
});

export const { useGetBuyingGuideQuery, useGetBuyingGuideDetailsQuery } = buyingGuideApi;