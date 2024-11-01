import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ICandidate from "../../interface/employer/candidate";
import IProfileEpr from "../../interface/employer/profileEpr";

export const candidateApi = createApi({
    reducerPath: 'candidateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['candidate'],
    endpoints: (builder: any) => ({
        getCandidates: builder.query({
            query: () => '/candidates',
            providesTags: ['candidate']
        }),
        getCandidatesByUId: builder.query({
            query: (uid: string) => `/candidates/${uid}/list`,
            providesTags: ['candidate']
        }),
        getCandidate: builder.query({
            query: (id: string) => `/candidates/${id}`,
            providesTags: ['candidate']
        }),
        createCandidate: builder.mutation({
            query: (candidate: IProfileEpr) => ({
                url: `/candidates`,
                method: 'POST',
                body: candidate
            }),
            invalidatesTags: ['candidate']
        }),
        removeCandidate: builder.mutation({
            query: (id: string) => ({
                url: `/candidates/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['candidate']
        }),
    })
})

export const {
    useGetCandidatesQuery,
    useGetCandidatesByUIdQuery,
    useGetCandidateQuery,
    useCreateCandidateMutation,
    useRemoveCandidateMutation
} = candidateApi