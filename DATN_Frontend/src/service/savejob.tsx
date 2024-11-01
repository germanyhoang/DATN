import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const jobsaveApi: any = createApi({
    reducerPath: 'jobsaveApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['JobSave'],
    endpoints: (builder) => ({
        getJobsaveByUId: builder.query({
            query: (uid: string) => `/jobsave/${uid}`,
            providesTags: ['JobSave']
        }),
        getJobApplyByUId: builder.query({
            query: (uid: string) => `/user-cvs/${uid}`
            // providesTags: ['JobSave']
        }),
        addJobsave: builder.mutation({
            query: (jobsave: any) => ({
                url: '/jobsave',
                method: 'POST',
                body: jobsave
            }),
            invalidatesTags: ['JobSave']
        }),
        removeJobsave: builder.mutation({
            query: (id: string) => ({
                url: `/jobsave/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['JobSave']
        })
    })
})
export const {
    useGetJobsaveByUIdQuery,
    useAddJobsaveMutation,
    useRemoveJobsaveMutation
} = jobsaveApi