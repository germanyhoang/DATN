import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IUserNTD from "../interface/employer/user_epr";

export const authEprApi = createApi({
    reducerPath: 'authEpr',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['authEpr'],
    endpoints: (builder: any) => ({
        registerWithEmployer: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/signup/ntd',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        LoginWithEmployer: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/signin/ntd',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        getUserEprByEmail: builder.query({
            query: (email: string) => `/epr-users/${email}/detail`,
            providesTags: ['authEpr']
        }),
        getUserEpr: builder.query({
            query: (id: string) => `/epr-users/${id}`,
            providesTags: ['authEpr']
        }),
        getUsersEpr: builder.query({
            query: () => '/epr-users',
            providesTags: ['authEpr']
        }),
        updateUserEpr: builder.mutation({
            query: (user: IUserNTD) => ({
                url: `/epr-users/${user._id}/edit`,
                method: 'PUT',
                body: user
            }),
            invalidateTags: ['authEpr']
        }),
        sendEmailEResetPass: builder.mutation({
            query: (user: IUserNTD) => ({
                url: `/epr-users/forgotpassword/?email=${user.email}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        resetEPassword: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/epr-users/resetpassword',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        changePassEpr: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/epr-users/changepassepr',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        sendEmailVerified: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/epr-users/verifiedemail',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpr']
        }),
        activeEmail: builder.mutation({
            query: (user: IUserNTD) => ({
                url: '/epr-users/activeEmail',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpr']
        })
    })
})

export const {
    useRegisterWithEmployerMutation,
    useLoginWithEmployerMutation,
    useGetUserEprByEmailQuery,
    useSendEmailEResetPassMutation,
    useResetEPasswordMutation,
    useChangePassEprMutation,
    useUpdateUserEprMutation,
    useSendEmailVerifiedMutation,
    useActiveEmailMutation,
    useGetUsersEprQuery,
    useGetUserEprQuery,
} = authEprApi