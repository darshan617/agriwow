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
    }),
  }),
});

export const { useGetOrderHistoryQuery } = orderHistoryApi;
