import { apiSlice } from '../apiSlice'

const blogApi = apiSlice.injectEndpoints({
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
        getBlogDetails: builder.query({
            query: ({slug}) => ({
                url: `/blogs/${slug}`,
                method: "GET",
            }),
            providesTags: ['blog'],
        }),
        getRelatedBlogs: builder.query({
            query: ({slug}) => ({
                url: `/blogs/${slug}/related`,
                method: "GET",
            }),
            providesTags: ['relatedBlogs'],
        }),
    }),
})

export const { useGetBlogListingMutation, useGetAllBlogCategoriesMutation, useGetBlogDetailsQuery, useGetRelatedBlogsQuery } = blogApi