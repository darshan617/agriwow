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
        })
    }),
})

export const {
    useGetHomeDataQuery
} = testApi