import { apiSlice } from '../apiSlice'

const bloglistingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogListing: builder.mutation({
            query: ({body}) => ({
                url: `/blogs-list`,
                method: "POST", 
                body: body,
            }),
            invalidatesTags: ["blogListing"],
        }),
        getAllBlogCategories: builder.mutation({
            query: () => ({
                url: `/blogs-categories`,
                method: "GET",
            }),
            invalidatesTags: ["allBlogCategories"],
        }),
    }),
})

export const { useGetBlogListingMutation, useGetAllBlogCategoriesMutation } = bloglistingApi