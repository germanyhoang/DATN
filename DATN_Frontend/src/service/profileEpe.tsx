import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const profileEpeApi: any = createApi({
    reducerPath: 'profileEpeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['profileEpr'],
    endpoints: (builder) => ({
        getEprProfiles: builder.query<any[], void>({
            query: () => '/profiles',
            providesTags: ['profileEpr']
        }),
        getEprProfile: builder.query<any, string>({
            query: (email: string) => `/profiles/${email}`,
            providesTags: ['profileEpr']
        }),
        addEprProfile: builder.mutation({
            query: (profile: any) => ({
                url: `/profiles`,
                method: "POST",
                body: profile
            }),
            invalidatesTags: ['profileEpr']
        }),
        removeEprProfile: builder.mutation({
            query: (id: string) => ({
                url: `/profiles/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['profileEpr']
        }),
        updateEprProfile: builder.mutation({
            query: (profile: any) => ({
                url: `/profiles/${profile._id}`,
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
} = profileEpeApi