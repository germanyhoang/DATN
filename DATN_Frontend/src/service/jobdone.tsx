import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const jobdoneApi: any = createApi({
    reducerPath: 'jobdoneApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['JobDone'],
    endpoints: (builder) => ({
        getJobdones: builder.query({
            query: (uid: string) => `/jobdone/${uid}`,
            providesTags: ['JobDone']
        }),
        addJobdone: builder.mutation({
            query: (jobdone: any) => ({
                url: '/jobdone',
                method: 'POST',
                body: jobdone
            }),
            invalidatesTags: ['JobDone']
        }),
        removeJobdone: builder.mutation({
            query: (id: string) => ({
                url: `/jobdone/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['JobDone']
        }),
        getJobApplyByUId: builder.query({
            query: (uid: string) => `/user-cvs/${uid}`,
            providesTags: ['JobDone']
        }),
    })
})
export const {
    useGetJobdonesQuery,
    useAddJobdoneMutation,
    useRemoveJobdoneMutation,
    useGetJobApplyByUIdQuery
} = jobdoneApi