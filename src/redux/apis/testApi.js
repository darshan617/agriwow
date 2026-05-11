import { apiSlice } from "../apiSlice";

const testApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
        }),
    }),
})

export const {
    useGetPostsQuery
} = testApi