import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IBanner from "../../interface/admin/banner";


export const bannerApi: any = createApi({
    reducerPath: 'banner',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['banner'],
    endpoints: (builder: any) => ({
        getBanner: builder.query({
            query: (_id: string) => `/banners/${_id}`,
            providesTags: ['banner']
        }),

        getBanners: builder.query({
            query: () => '/banners',
            providesTags: ['banner']
        }),

        changeBanner: builder.mutation({
            query: (banner: IBanner) => ({
                url: `/banners/change-banner`,
                method: 'PUT',
                body: banner
            }),
            invalidatesTags: ['banner']
        }),
        createBanner: builder.mutation({
            query: (banner: IBanner) => ({
                url: `/banners/create`,
                method: 'POST',
                body: banner
            }),
            invalidatesTags: ['banner']
        }),
        
       
    })
})

export const {
    useChangeBannerMutation,
    useGetBannerQuery,
    useGetBannersQuery,
    useCreateBannerMutation,
} = bannerApi