import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const buyProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyProduct: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        return {
          url: "/buy-now",
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
      invalidatesTags: ["getCartData"],
    }),
  }),
});


export const { useBuyProductMutation } = buyProductApi;