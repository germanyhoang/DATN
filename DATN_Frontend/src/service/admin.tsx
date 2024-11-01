import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interface/admin/users";
import ICareer from "../interface/admin/career";


interface IAuth {
    name: string;
    password: string
}
interface Block {
    _id: string,
    level_auth: string
}
export const adminApi = createApi({
    reducerPath: 'admin',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['User', 'Career'],
    endpoints: (builder) => ({
        signinAdmin: builder.mutation({
            query: (user: IAuth) => ({
                url: '/signin',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']

        }),
        signupA: builder.mutation({
            query: (user: IAuth) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']

        }),
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['User']
        }),
        getUser: builder.query<User, string>({
            query: (email: string) => `/users/${email}/detail`,
            providesTags: ['User']
        }),
        getUserById: builder.query<User[],string>({
            query: (id: string) => `/users/${id}`,
            providesTags: ['User']
        }),
        addUser: builder.mutation<User, Partial<User>>({
            query: (user: any) => ({
                url: `/users`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: ({ ...patch }) => ({
                url: `/users`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: ['User']
        }),
        removeCareer: builder.mutation({
            query: (id: string) => ({
                url: `/careers/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['Career']
        }),
        addCareer: builder.mutation<ICareer, Omit<ICareer, '_id'>>({
            query: (career: ICareer) => ({
                
                url: '/careers',
                method: 'POST',
                body: career
            }),
            invalidatesTags: ['Career']
        }),
        getCareers: builder.query<ICareer[], void>({
            query: () => '/careers',
            providesTags: ['Career']
        }),

        blockUser: builder.mutation({
            query: (user: any) => ({
                url: `/users/block`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),

        unlockUser: builder.mutation({
            query: (user: any) => ({
                url: `/users/unlock`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        editCareer: builder.mutation<ICareer, Partial<ICareer> & Pick<ICareer, '_id'>>({
            query: (career: ICareer) => ({
                url: `/careers/edit/${career._id}`,
                method: 'PUT',
                body: career
            }),
            invalidatesTags: ['Career']
        }),
        getCareer: builder.query({
            query: (id: string) => `/careers/${id}`,
            providesTags: ['Career']
        }),
    })
});
export const {
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useAddCareerMutation,
    useGetCareersQuery,
    useGetCareerQuery,
    useRemoveCareerMutation,
    useSigninAdminMutation,
    useSignupAMutation,
    useBlockUserMutation,
    useEditCareerMutation,
    useGetUserByIdQuery,
    useUnlockUserMutation,
} = adminApi