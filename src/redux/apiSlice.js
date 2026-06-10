import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://goyalinfotech.in/agriwow/public/api",
  }),
  tagTypes: [
    "home",
    "category",
    "products",
    "auth",
    "addToCart",
    "blogListing",
    "allBlogCategories",
    "addToWishlist",
    "getWishlist",
    "removeFromWishlist",
    "getCartData",
    "getAvailableCoupons",
    "ProductsByCategory",
    "applyCoupon",
    "SearchProducts",
    "blog",
    "relatedBlogs",

    "faqs",
  ],
  overrideExisting: true,
  endpoints: (builder) => ({}),
});
