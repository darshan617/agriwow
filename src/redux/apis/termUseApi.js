
import { apiSlice } from '../apiSlice'

const termUseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTermUse: builder.query({
      query: () => ({
        url: '/terms-of-use',
        method: 'GET',
      }),
      providesTags: ['termUse'],
    }),
  }),
})

export const { useGetTermUseQuery } = termUseApi;