import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        return {
          url: `/add-review`,
          method: "POST",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
              // "Content-Type": "application/json",
            }),
          },
          body,
        };
      },
      invalidatesTags: ["reviews", "product"],
    }),
    updateReview: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/update-review`,
          method: "POST",
          headers: {
            ...(userToken && { Authorization: `Bearer ${userToken}` }),
          },
          body,
        };
      },
      invalidatesTags: ["reviews", "product"],
    }),
    deleteReview: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/delete-review`,
          method: "POST",
          headers: {
            ...(userToken && { Authorization: `Bearer ${userToken}` }),
            "Content-Type": "application/json",
          },
          body,
        };
      },
      invalidatesTags: ["reviews", "product"],
    }),
  }),
  // overrideExisting: true,
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
