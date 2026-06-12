import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const BUY_NOW_ADD_PENDING_KEY = "buyNowAddPending";

export const markBuyNowAddPending = ({ productId, quantity, userId }) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    BUY_NOW_ADD_PENDING_KEY,
    JSON.stringify({ productId, quantity, userId }),
  );
};

export const isBuyNowAddPending = (query = {}) => {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(BUY_NOW_ADD_PENDING_KEY);
    if (!raw) return false;
    const pending = JSON.parse(raw);
    return (
      String(pending.productId) === String(query.productId) &&
      String(pending.quantity) === String(query.quantity) &&
      String(pending.userId) === String(query.userId)
    );
  } catch {
    return false;
  }
};

export const clearBuyNowAddPending = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BUY_NOW_ADD_PENDING_KEY);
};

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
    placeOrder: builder.mutation({
      query: ({ body }) => ({
        url: "/checkout/place-order",
        method: "POST",
        headers: headers(),
        body,
      }),
      invalidatesTags: ["getBuyNowData"],
    }),
    verifyPayment: builder.mutation({
      query: ({ body }) => ({
        url: "/checkout/verify-payment",
        method: "POST",
        headers: headers(),
        body,
      }),
      invalidatesTags: ["getBuyNowData"],
    }),
  }),
});

export const {
  useBuyProductMutation,
  useUpdateBuyNowMutation,
  useGetBuyNowDataQuery,
  usePlaceOrderMutation,
  useVerifyPaymentMutation,
} = buyProductApi;
