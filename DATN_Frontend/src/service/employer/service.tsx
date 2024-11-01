import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IService from "../../interface/employer/service";

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['service'],
    endpoints: (builder) => ({
        getServices: builder.query<IService[], string>({
            query: (uid: string) => `/services/${uid}`,
            providesTags: ['service']
        }),
        createService: builder.mutation({
            query: (service: IService) => ({
                url: `/services`,
                method: 'POST',
                body: service
            }),
            invalidatesTags: ['service']
        }),
        removeService: builder.mutation({
            query: (id: string) => ({
                url: `/services/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['service']
        }),
    })
})

export const {
    useGetServicesQuery,
    useCreateServiceMutation,
    useRemoveServiceMutation
} = serviceApi