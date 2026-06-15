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
const myProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfileDetails: builder.query({
      query: () => ({
        url: "/user-profile",
        method: "GET",
        headers: headers(),
      }),
      providesTags: ["myProfile"],
    }),
    updateMyProfile: builder.mutation({
      query: ({ body }) => ({
        url: "user-profile/update",
        method: "POST",
        headers: headers(),
        body,
      }),
      invalidatesTags: ["myProfile"],
    }),
  }),
});

export const { useGetMyProfileDetailsQuery, useUpdateMyProfileMutation } =
  myProfileApi;
