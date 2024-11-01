import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IPackage from "../interface/package";

export const packageApi = createApi({
    reducerPath: 'packageEpr',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['packageEpr'],
    endpoints: (builder) => ({
        getPackages: builder.query<IPackage[], string>({
            query: (uid: string) => `/packages/${uid}`,
            providesTags: ['packageEpr']
        }),
        getPackage: builder.query<IPackage, string>({
            query: (id: string) => `/packages/${id}`,
            providesTags: ['packageEpr']
        })
    })
})

export const {
    useGetPackagesQuery,
    useGetPackageQuery,
} = packageApi