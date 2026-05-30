import { apiSlice } from "../apiSlice";

const testApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHomeData: builder.query({
            query: () => {
                return {
                    url: "/home",
                    method: "GET",
                }
            },
            providesTags:['HomeData'],

        }),
        getMenuProductData: builder.query({
            query: () => {
                return {
                    url: "/all-category-subcategories",
                    method: "GET",
                }
            },
            providesTags:['MenuProductData'],
        }),
        getProducts: builder.query({
            query: (params = {}) => ({
                url: "/products",
                method: "GET",
                params,
            }),
            providesTags: ['Products'],
        }),
        getProductsByCategory: builder.query({
            query: (slug) => ({
              url: `/${slug}`,
              method: "GET",
            }),
            providesTags: (result, error, slug) => [
              { type: 'ProductsByCategory', id: slug },
            ],
          }),
        getProductsBySubCategory: builder.query({
            query: ({ categorySlug, subCategorySlug }) => ({
              url: `/${categorySlug}/${subCategorySlug}`,
              method: "GET",
            }),
            providesTags: (result, error, { categorySlug, subCategorySlug } = {}) => [
              { type: 'ProductsBySubCategory', id: `${categorySlug}/${subCategorySlug}` },
            ],
          }),
        searchProducts: builder.query({
            query: (query) => ({
              url: `/search`,
              method: "GET",
              params: { query },
            }),
            providesTags: (result, error, query) => [
              { type: 'SearchProducts', id: query || 'ALL' },
            ],
        }),
    }),
})

export const {
    useGetHomeDataQuery,
    useGetMenuProductDataQuery,
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductsBySubCategoryQuery,
    useSearchProductsQuery,
    useLazySearchProductsQuery,
} = testApi