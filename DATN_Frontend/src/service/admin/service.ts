import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const serviceAdmApi = createApi({
    reducerPath: 'serviceAdm',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['service'],
    endpoints: (builder) => ({
        getAdmServices: builder.query<any[], void>({
            query: () => '/ad-services',
            providesTags: ['service']
        }),
        addAdmService: builder.mutation({
            query: (service: any) => ({
                url: '/ad-services',
                method: 'POST',
                body: service
            })
        })
    })
})

export const {
    useGetAdmServicesQuery,
    useAddAdmServiceMutation,
} = serviceAdmApi