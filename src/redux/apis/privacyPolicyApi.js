import { apiSlice } from '../apiSlice'  

const privacyPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/privacy-policy',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery } = privacyPolicyApi;
