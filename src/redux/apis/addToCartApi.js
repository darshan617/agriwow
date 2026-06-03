import { apiSlice } from "../apiSlice";

const addToCartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: ({body}) => ({
                url: "/add-to-cart",
                method: "POST",
                body: body,
            }),
           invalidatesTags: ["addToCart"],
        }),
    }),
})

export const {
 useAddToCartMutation,
} = addToCartApi