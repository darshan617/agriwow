
import { apiSlice } from '../apiSlice'

const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.mutation({
      query: ({ body }) => ({
        url: '/get-location',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getLocation'],
    }),
  }),
});

export const { useGetLocationMutation } = locationApi;