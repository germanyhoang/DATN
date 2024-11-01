import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import IProfileEpr from "../../interface/employer/profileEpr"

export const profileEprApi: any = createApi({
    reducerPath: 'profileEprApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['profileEpr'],
    endpoints: (builder) => ({
        getEprProfiles: builder.query<IProfileEpr[], void>({
            query: () => '/epr-profiles',
            providesTags: ['profileEpr']
        }),
        getEprProfile: builder.query<IProfileEpr, string>({
            query: (email: string) => `/epr-profiles/${email}`,
            providesTags: ['profileEpr']
        }),
        addEprProfile: builder.mutation({
            query: (profile: IProfileEpr) => ({
                url: `/epr-profiles`,
                method: "POST",
                body: profile
            }),
            invalidatesTags: ['profileEpr']
        }),
        removeEprProfile: builder.mutation({
            query: (id: string) => ({
                url: `/epr-profiles/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['profileEpr']
        }),
        updateEprProfile: builder.mutation({
            query: (profile: IProfileEpr) => ({
                url: `/epr-profiles/${profile._id}`,
                method: 'PUT',
                body: profile
            }),
            invalidatesTags: ['profileEpr']
        }),
    })
})

export const {
    useGetEprProfilesQuery,
    useGetEprProfileQuery,
    useAddEprProfileMutation,
    useRemoveEprProfileMutation,
    useUpdateEprProfileMutation,
} = profileEprApi