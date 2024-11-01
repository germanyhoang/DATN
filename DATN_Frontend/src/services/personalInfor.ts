import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPersonalInfor } from '../interfaces/personalInfor'
export const personalInforApi = createApi({
    reducerPath: "personalInforApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
    tagTypes: ['PersonalInfor'],
    endpoints: (builder) => ({
        getPersonalInfors: builder.query<IPersonalInfor[], void>({
            query: () => ({ url: '/personalInfors' }),
            providesTags: ['PersonalInfor'],
        }),
        getPersonalInfor: builder.query<IPersonalInfor, string>({
            query: (id:string) => ({ url: `/personalInfors/${id}` }),
            providesTags: ['PersonalInfor'],
        }),
        editPersonalInfor: builder.mutation<IPersonalInfor, Partial<IPersonalInfor> & Pick<IPersonalInfor, '_id'>>({
            query: (personalInfor: IPersonalInfor) => ({
                url: `/personalInfors/${personalInfor._id}`,
                method: "PUT",
                body: personalInfor,
            }),
            invalidatesTags: ['PersonalInfor'],

        })
    })
})
export const { useGetPersonalInforQuery, useGetPersonalInforsQuery, useEditPersonalInforMutation } = personalInforApi