import { apiSlice } from '../apiSlice';

const returnPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReturnPolicy: builder.query({
      query: () => ({
        url: '/return-policy',
        method: 'GET',
      }),
      providesTags: ['returnPolicy'],
    }),
  }),
});

export const { useGetReturnPolicyQuery } = returnPolicyApi;
