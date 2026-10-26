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
      query: ({ slug, minPrice, maxPrice, page = 1, per_page = 10 }) => {
        return {
          url: `/${slug}`,
          method: "GET",
          params: {
            ...(minPrice != null && minPrice !== "" && { min_price: minPrice }),
            ...(maxPrice != null && maxPrice !== "" && { max_price: maxPrice }),
            page: Number(page) || 1,
            per_page: Number(per_page) || 10,
          },
        };
      },
      providesTags: (
        result,
        error,
        { slug, minPrice, maxPrice, page, per_page } = {},
      ) => [
        {
          type: "ProductsByCategory",
          id: `${slug}-${page}-${per_page}-${minPrice}-${maxPrice}`,
        },
      ],
    }),
    getProductsBySubCategory: builder.query({
      query: ({
        categorySlug,
        subCategorySlug,
        minPrice,
        maxPrice,
        page = 1,
        per_page = 10,
      }) => {
        return {
          url: `/${categorySlug}/${subCategorySlug}`,
          method: "GET",
          params: {
            ...(minPrice != null && minPrice !== "" && { min_price: minPrice }),
            ...(maxPrice != null && maxPrice !== "" && { max_price: maxPrice }),
            page: Number(page) || 1,
            per_page: Number(per_page) || 10,
          },
        };
      },
      providesTags: (
        result,
        error,
        {
          categorySlug,
          subCategorySlug,
          minPrice,
          maxPrice,
          page,
          per_page,
        } = {},
      ) => [
        {
          type: "ProductsBySubCategory",
          id: `${categorySlug}/${subCategorySlug}-${page}-${per_page}-${minPrice}-${maxPrice}`,
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
