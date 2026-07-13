import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  }),
  // Transfer SSR RTK Query cache (e.g. getHomeData from getServerSideProps)
  // into the client store so hooks do not immediately refetch.
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
    "getBuyNowData",
    "getAvailableCoupons",
    "ProductsByCategory",
    "applyCoupon",
    "SearchProducts",
    "blog",
    "relatedBlogs",
    "reviews",
    "faqs",
    "product",
    "ProductsBySubCategory",
    "reviewApi",
    "updateReview",
    "deleteReview",
    "myProfile",
    "subscribeEmail",
    "getBannerData",
    "askQuestion",
    "getContactDetails",
    "orderHistory",
    "aboutUs",
    "getAllDeliveryAddresses",
    "shippingReturn",
    "orderInfo",
    "termUse",
    "getLocation",
    "returnPolicy",
    "privacyPolicy",
    "checkPincode",
    "buyingGuide",
    "trackOrder",
  ],
  overrideExisting: true,
  endpoints: (builder) => ({}),
});
