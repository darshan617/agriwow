import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const headers = () => {
  const userToken = Cookies.get("userToken");
  return {
    ...(userToken && {
      Authorization: `Bearer ${userToken}`,
    }),
    "Content-Type": "application/json",
  };
};

const aboutUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUsData: builder.query({
      query: () => ({
        url: "/about-us",
        method: "GET",
        headers: headers(),
      }),
      providesTags: ["aboutUs"],
    }),
  }),
});

export const { useGetAboutUsDataQuery } = aboutUsApi;
