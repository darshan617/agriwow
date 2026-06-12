import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const addToWishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        return {
          url: "/add-to-wishlist",
          method: "POST",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
            "Content-Type": "application/json",
          },
          body,
        };
      },
      invalidatesTags: [
        "getWishlist",
        "home",
        "products",
        "ProductsByCategory",
        "ProductsBySubCategory",
        "product",
        "SearchProducts",
      ],
    }),

    getWishlist: builder.query({
      query: (userId) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/get-wishlist?user_id=${userId}`,
          method: "GET",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
          },
        };
      },
      providesTags: ["getWishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/remove-wishlist-item`,
          method: "POST",
          headers: {
            ...(userToken && { Authorization: `Bearer ${userToken}` }),
            "Content-Type": "application/json",
          },
          body: body,
        };
      },
      invalidatesTags: [
        "getWishlist",
        "home",
        "products",
        "ProductsByCategory",
        "ProductsBySubCategory",
        "product",
        "SearchProducts",
      ],
    }),
  }),
});

export const getWishlistItems = (wishlistData) => {
  const raw = wishlistData?.data;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.wishlist)) return raw.wishlist;
  if (Array.isArray(raw?.products)) return raw.products;
  if (Array.isArray(raw?.items)) return raw.items;
  return [];
};

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = addToWishlistApi;
