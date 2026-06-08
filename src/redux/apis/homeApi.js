import { apiSlice } from "../apiSlice";

export const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: () => {
        return {
          url: "/home",
          method: "GET",
        };
      },
      providesTags: ["home"],
    }),

    searchProducts: builder.query({
      query: (query) => ({
        url: `/search`,
        method: "GET",
        params: { query },
      }),
      providesTags: (result, error, query) => [
        { type: "SearchProducts", id: query || "ALL" },
      ],
    }),
  }),
});

export const {
  useGetHomeDataQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
} = homeApi;
