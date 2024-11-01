import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import ICv from "../interface/cv"

export const cvApi: any = createApi({
    reducerPath: 'cvApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['Cv'],
    endpoints: (builder) => ({
        getCvs: builder.query<ICv[], void>({
            query: () => '/cvs',
            providesTags: ['Cv']
        }),
        getCvsByPostId: builder.query<ICv[], string>({
            query: (postId: string) => `/cvs/${postId}`,
            providesTags: ['Cv']
        }),
        getCv: builder.query<ICv, string>({
            query: (id: string) => `/cvs/${id}/detail`,
            providesTags: ['Cv']
        }),
        getCvByPostIdAndEmail: builder.query<ICv, { postId: string, email: string }>({
            query: (args) => `/cvs/${args.postId}/${args.email}`,
            providesTags: ['Cv']
        }),
        applyCv: builder.mutation({
            query: (profile: any) => ({
                url: `/cvs/apply`,
                method: "POST",
                body: profile
            }),
            invalidatesTags: ['Cv']
        }),
        removeCv: builder.mutation({
            query: (id: string) => ({
                url: `/cvs/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['Cv']
        }),
        approveCv: builder.mutation({
            query: (id: string) => ({
                url: `/cvs/${id}/duyet`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Cv']
        }),
        refuseCv: builder.mutation({
            query: (id: string) => ({
                url: `/cvs/${id}/tuchoi`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Cv']
        }),
        setIsNew: builder.mutation({
            query: (id: string) => ({
                url: `/cvs/set`,
                method: 'POST',
                body: id
            }),
            invalidatesTags: ['Cv']
        }),
    })
})

export const {
    useGetCvsQuery,
    useGetCvsByPostIdQuery,
    useGetCvQuery,
    useGetCvByPostIdAndEmailQuery,
    useApplyCvMutation,
    useRemoveCvMutation,
    useApproveCvMutation,
    useRefuseCvMutation,    
    useSetIsNewMutation,
} = cvApi