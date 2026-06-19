import { apiSlice } from "../apiSlice";
import Cookies from "js-cookie";

const authHeaders = () => {
  const userToken = Cookies.get("userToken");
  return {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
};

const orderHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: () => ({
        url: "/my-orders",
        method: "GET",
        headers: authHeaders(),
      }),
      providesTags: ["orderHistory"],
    }),
    viewOrderDetails: builder.query({
      query: ({ orderId }) => ({
        url: `/order/view/${orderId}`,
        method: "GET",
        headers: authHeaders(),
      }),
      providesTags: ["orderHistory"],
    }),
  }),
});

export const { useGetOrderHistoryQuery, useViewOrderDetailsQuery } =
  orderHistoryApi;
