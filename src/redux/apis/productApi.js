import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query({
      query: ({ slug }) => ({
        url: `/product/${slug}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["product"],
    }),
    getBestSellerProducts: builder.query({
      query: () => ({
        url: "/products/best-selling",
        method: "GET",
      }),
      providesTags: ["bestSellerProducts"],
    }),
  }),
});

export const { useGetProductDetailsQuery, useGetBestSellerProductsQuery } = productApi;
