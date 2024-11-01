import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IJobdone } from '../interfaces/jobdone'
export const jobdoneApi = createApi({
    reducerPath: "jobdoneApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
    tagTypes: ['Jobdone'],
    endpoints: (builder) => ({
        getJobdones: builder.query<IJobdone[], void>({
            query: () => ({ url: '/jobdones' }),
            providesTags: ['Jobdone'],
        }),
        getJobdone: builder.query<IJobdone, number>({
            query: (id) => ({ url: `/jobdones/${id}` }),
            providesTags: ['Jobdone'],
        })
    })
})
export const { useGetJobdonesQuery, useGetJobdoneQuery } = jobdoneApi