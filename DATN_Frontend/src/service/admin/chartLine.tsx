import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const chartLine = createApi({
    reducerPath: 'chartLine',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['chartLine'],
    endpoints: (builder) => ({
        getChartLine: builder.query({
            query: () => '/chartLine',
            providesTags: ['chartLine']
        }),
        getHistoryOrder:builder.query({
            query: () => '/orders',
            providesTags: ['chartLine']
        }),
    })
})

export const {
    useGetChartLineQuery,
    useGetHistoryOrderQuery
} = chartLine