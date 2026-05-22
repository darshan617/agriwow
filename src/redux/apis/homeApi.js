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

    }),
})

export const {
    useGetHomeDataQuery,
    useGetMenuProductDataQuery,
    useGetProductsQuery,
} = testApi