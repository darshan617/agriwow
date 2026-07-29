import { apiSlice } from "../apiSlice";

const accessoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAccessories: builder.query({
        query: () => ({
          url: "/accessories",
          method: "GET",
        }),
        providesTags: ["accessories"],
      }),
      getAccessoriesSubcategories: builder.query({
        query: (slug) => ({
          url: `/accessories/subcategory/${slug}`,
          method: "GET",
        }),
        providesTags: ["accessoriesSubcategories"],
      }),
    }),
  });

export const { useGetAccessoriesQuery, useGetAccessoriesSubcategoriesQuery } = accessoryApi;