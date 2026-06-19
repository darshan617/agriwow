import { apiSlice } from '../apiSlice';

const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContactDetails: builder.query({
      query: () => ({
        url: "/contact-details",
        method: "GET",
      }),
      providesTags: ["getContactDetails"],
    }),
  }),
});

export const { useGetContactDetailsQuery } = contactApi;