import { apiSlice } from "../apiSlice";

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductDetails: builder.query({
            query: ({slug}) => ({
                url: `/product/${slug}`,
                method: "GET",
            }),
           providesTags: ['product'],
        })
    }),
})

export const {
 useGetProductDetailsQuery,
} = productApi