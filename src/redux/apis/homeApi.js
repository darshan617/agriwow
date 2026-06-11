import { apiSlice } from "../apiSlice";
import Cookies from "js-cookie";
export const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: (arg) => {
        const userToken = arg?.userToken ?? Cookies.get("userToken");
        return {
          url: "/home",
          method: "GET",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            }),
          },
        };
      },
      providesTags: ["home"],
    }),

    searchProducts: builder.query({
      query: (query) => {
        const userToken = Cookies.get("userToken");
        return {
        url: `/search`,
        method: "GET",
        params: { query },
        headers: {
          ...(userToken && {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          }),
        },
      };
    },
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
