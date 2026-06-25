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
      async onQueryStarted({ body }, { dispatch, queryFulfilled, getState }) {
        const productId = body?.product_id;
        const entry = productId
          ? { product_id: productId, quantity: body?.quantity ?? 1 }
          : null;

        let patchResult;
        if (entry) {
          const cached =
            addToCartApi.endpoints.getCartData.select()(getState());
          if (cached?.data !== undefined) {
            patchResult = dispatch(
              addToCartApi.util.updateQueryData(
                "getCartData",
                undefined,
                (draft) => {
                  if (!Array.isArray(draft?.data)) draft.data = [];
                  const exists = draft?.data?.some(
                    (item) =>
                      (item?.product_id ?? item?.product?.id) === productId,
                  );
                  if (!exists) draft?.data?.push(entry);
                },
              ),
            );
          } else {
            dispatch(
              addToCartApi.util.upsertQueryData("getCartData", undefined, {
                data: [entry],
              }),
            );
          }
        }

        try {
          const { data } = await queryFulfilled;
          const sessionId = data?.session_id ?? data?.data?.session_id;
          if (sessionId) {
            setCartSessionId(sessionId);
          }
          await dispatch(
            addToCartApi.endpoints.getCartData.initiate(undefined, {
              forceRefetch: true,
              subscribe: false,
            }),
          );
        } catch {
          patchResult?.undo?.();
        }
      },
      invalidatesTags: ["addToCart"],
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
      providesTags: ["getAvailableCoupons"],
    }),
    addDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/add-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getAllDeliveryAddresses"],
    }),
    getAllDeliveryAddresses: builder.query({
      query: () => ({
        url: "/all-addresses",
        method: "GET",
        headers: getCartRequestHeaders(),
      }),
      providesTags: ["getAllDeliveryAddresses"],
    }),
    updateDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/update-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData", "getAllDeliveryAddresses"],
    }),
    deleteDeliveryAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/delete-address",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getAllDeliveryAddresses"],
    }),
    removeCoupon: builder.mutation({
      query: ({ body }) => ({
        url: "/remove-coupon-from-cart",
        method: "POST",
        headers: getCartRequestHeaders(),
        body,
      }),
      invalidatesTags: ["getCartData", "getAvailableCoupons"],
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
  useRemoveCouponMutation,
} = addToCartApi;
