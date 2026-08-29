import { apiSlice } from "../apiSlice";

const warrantyTermsAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    warrantyTerms: builder.query({
      query: () => ({
        url: "/warranty-terms",
        method: "GET",
      }),
      providesTags: ["warrantyTerms"],
    }),
  }),
});

export const { useWarrantyTermsQuery } = warrantyTermsAPi;
