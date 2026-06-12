import { apiSlice } from "../apiSlice";

const CategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuProductData: builder.query({
      query: () => {
        return {
          url: "/all-category-subcategories",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    getProducts: builder.query({
      query: (params = {}) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["products"],
    }),
    getProductsByCategory: builder.query({
      query: (slug) => ({
        url: `/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [
        { type: "ProductsByCategory", id: slug },
      ],
    }),
    getProductsBySubCategory: builder.query({
      query: ({ categorySlug, subCategorySlug }) => ({
        url: `/${categorySlug}/${subCategorySlug}`,
        method: "GET",
      }),
      providesTags: (result, error, { categorySlug, subCategorySlug } = {}) => [
        {
          type: "ProductsBySubCategory",
          id: `${categorySlug}/${subCategorySlug}`,
        },
      ],
    }),
  }),
});

export const {
  useGetMenuProductDataQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery,
} = CategoryApi;
