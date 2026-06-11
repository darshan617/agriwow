import { apiSlice } from "../apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `/reviews/${productId}`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;
