import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const headers = () => {
  const userToken = Cookies.get("userToken");
  return {
    ...(userToken && {
      Authorization: `Bearer ${userToken}`,
    }),
    "Content-Type": "application/json",
  };
};

const buyProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyProduct: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        return {
          url: "/buy-now/add",
          method: "POST",
          headers: headers(),
          body,
        };
      },
      invalidatesTags: ["getBuyNowData"],
    }),
    updateBuyNow: builder.mutation({
      query: ({ body }) => ({
        url: "/buy-now/update",
        method: "POST",
        headers: headers(),
        body,
      }),
      invalidatesTags: ["getBuyNowData"],
    }),
    getBuyNowData: builder.query({
      query: () => ({
        url: "/buy-now/get",
        method: "GET",
        headers: headers(),
      }),
      providesTags: ["getBuyNowData"],
    }),
  }),
});

export const {
  useBuyProductMutation,
  useUpdateBuyNowMutation,
  useGetBuyNowDataQuery,
} = buyProductApi;
