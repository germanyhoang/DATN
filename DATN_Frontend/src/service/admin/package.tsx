import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IAdPackage from "../../interface/admin/package";

export const packageAdmApi = createApi({
    reducerPath: 'packageAdm',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['packageAdm'],
    endpoints: (builder) => ({
        getAdmPackages: builder.query<IAdPackage[], void>({
            query: () => '/ad-packages',
            providesTags: ['packageAdm']
        }),
        getAdmPackage: builder.query<IAdPackage, string>({
            query: (id: string) => `/ad-packages/${id}`,
            providesTags: ['packageAdm']
        })
    })
})

export const {
    useGetAdmPackagesQuery,
    useGetAdmPackageQuery,
} = packageAdmApi