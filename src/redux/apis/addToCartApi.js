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
        } catch {}
      },
      invalidatesTags: ["getCartData", "addToCart"],
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
      invalidatesTags: ["getCartData", "addToCart"],
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
    applyCoupon: builder.mutation({
      query: ({ body }) => ({
        url: "/apply-coupon",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["applyCoupon", "getCartData"],
    }),
    updateCart: builder.mutation({
      query: ({ body }) => ({
        url: "/update-cart",
        method: "POST",
        body,
        headers: getCartRequestHeaders(),
      }),
      invalidatesTags: ["getCartData"],
    }),
    getAvailableCoupons: builder.query({
      query: () => ({
        url: "/available-coupons",
        method: "GET",
        headers: getCartRequestHeaders(),
      }),
    }),
    addDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/add-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData"],
    }),
    getAllDeliveryAddresses: builder.query({
      query: () => ({
        url: "/all-addresses",
        method: "GET",
        headers: getCartRequestHeaders(),
      }),
      invalidatesTags: ["getCartData"],
    }),
    updateDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/update-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData"],
    }),
    deleteDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/delete-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartDataQuery,
  useRemoveFromCartMutation,
  useMergeCartMutation,
  useApplyCouponMutation,
  useUpdateCartMutation,
  useGetAvailableCouponsQuery,
  useAddDeliveryAddressMutation,
  useGetAllDeliveryAddressesQuery,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
} = addToCartApi;
