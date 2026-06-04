import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const userToken = Cookies?.get("userToken")
  ? decodeURIComponent(Cookies?.get("userToken"))
  : null;

console.log(Cookies?.get("userToken"), "userTokensssssssssssssssss");

console.log(userToken, "userToken");

const addToWishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        console.log("token:", userToken);

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
      invalidatesTags: ["addToWishlist"],
    }),

    addToWishlist: builder.mutation({
      query: ({ userId }) => {
        const userToken = Cookies.get("userToken");

        console.log("token:", userToken);

        return {
          url: `get-wishlist?user_id=${userId}`,
          method: "GET",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["getWishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
} = addToWishlistApi;
