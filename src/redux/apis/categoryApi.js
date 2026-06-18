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
      query: ({ slug, minPrice, maxPrice }) => {
        const params = new URLSearchParams();

        if (minPrice) params.append("min_price", minPrice);
        if (maxPrice) params.append("max_price", maxPrice);

        return {
          url: `/${slug}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result, error, { slug, minPrice, maxPrice } = {}) => [
        { type: "ProductsByCategory", id: slug, minPrice, maxPrice },
      ],
    }),
    getProductsBySubCategory: builder.query({
      query: ({ categorySlug, subCategorySlug, minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (minPrice) params.append("min_price", minPrice);
        if (maxPrice) params.append("max_price", maxPrice);
        return {
          url: `/${categorySlug}/${subCategorySlug}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (
        result,
        error,
        { categorySlug, subCategorySlug, minPrice, maxPrice } = {},
      ) => [
        {
          type: "ProductsBySubCategory",
          id: `${categorySlug}/${subCategorySlug}`,
          minPrice,
          maxPrice,
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
