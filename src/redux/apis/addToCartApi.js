import { apiSlice } from "../apiSlice";
import Cookies from "js-cookie";

const CART_SESSION_KEY = "cartSessionId";

export const getCartSessionId = () => Cookies.get(CART_SESSION_KEY);

export const setCartSessionId = (sessionId) => {
  if (sessionId) {
    Cookies.set(CART_SESSION_KEY, sessionId);
  }
};

const getCartRequestHeaders = () => {
  const userToken = Cookies.get("userToken");
  const sessionId = getCartSessionId();
  const headers = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  } else if (sessionId) {
    headers.session_id = sessionId;
  }

  return headers;
};

const addToCartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ body }) => ({
        url: "/add-to-cart",
        method: "POST",
        headers: {
          ...getCartRequestHeaders(),
          "Content-Type": "application/json",
        },
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.session_id) {
            setCartSessionId(data.session_id);
          }
        } catch {
        }
      },
      invalidatesTags: ["getCartData"],
    }),
    getCartData: builder.query({
      query: () => ({
        url: "/get-cart",
        method: "GET",
        headers: getCartRequestHeaders(),
      }),
      providesTags: ["getCartData"],
    }),
    removeFromCart: builder.mutation({
      query: ({ body }) => ({
        url: "/remove-cart-item",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData"],
    }),
    mergeCart: builder.mutation({
      query: ({ body }) => ({
        url: "/merge-cart",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartDataQuery, useRemoveFromCartMutation, useMergeCartMutation } = addToCartApi;
