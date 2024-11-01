import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IUserNTV from "../interface/user";

export const authApi: any = createApi({
    reducerPath: 'authEpeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['authEpe'],
    endpoints: (builder: any) => ({
        signup: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/signup/ntv',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpe']

        }),
        signin: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/signin/ntv',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        getUserByEmail: builder.query({
            query: (email: string) => `/epe-users/${email}/detail`,
            providesTags: ['authEpe']
        }),
        getUserByID: builder.query({
            query: (id: string) => `/epe-users/${id}`,
            providesTags: ['authEpe']
        }),
        getUsers: builder.query({
            query: () => '/epe-users',
            providesTags: ['authEpe']
        }),
        updateUser: builder.mutation({
            query: (user: IUserNTV) => ({
                url: `/epe-users/${user._id}/edit`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        sendEmailResetPass: builder.mutation({
            query: (user: IUserNTV) => ({
                url: `/epe-users/forgotpassword/?email=${user.email}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        resetPassword: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/resetpassword',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        changePassword: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/changepassword',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        changeAvatar: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/change-avatar',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        sendEmailVerified: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/verifiedemail',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        activeEmail: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/activeEmail',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        saveCV: builder.mutation({
            query: (user: IUserNTV) => ({
                url: '/epe-users/save-cv',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        appliedJob: builder.mutation({
            query: (user: any) => ({
                url: '/epe-users/applied-job',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
        changeAplliedStatus: builder.mutation({
            query: (user: any) => ({
                url: '/epe-users/change-applied-status',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['authEpe']
        }),
    })
})

export const {
    useSignupMutation,
    useSigninMutation,
    useSendEmailResetPassMutation,
    useResetPasswordMutation,
    useGetUserByEmailQuery,
    useGetUserByIDQuery,
    useChangePasswordMutation,
    useChangeAvatarMutation,
    useUpdateUserMutation,
    useSendEmailVerifiedMutation,
    useActiveEmailMutation,
    useGetUsersQuery,
    useSaveCVMutation,
    useAppliedJobMutation,
    useChangeAplliedStatusMutation,
} = authApi