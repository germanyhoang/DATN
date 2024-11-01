import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFeedback } from '../interfaces/feedback'
export const feedbackApi = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        getFeedbacks: builder.query<IFeedback[], void>({
            query: () => ({ url: '/feedbacks' }),
            providesTags: ['Feedback'],
        }),
        getFeedback: builder.query<IFeedback, number>({
            query: (id) => ({ url: `/feedbacks/${id}` }),
            providesTags: ['Feedback'],
        }),
        getFeedbacksByUId: builder.query({
            query: (uid: string) => `/feedbacks/${uid}/list`,
            providesTags: ['Feedback']
        }),
        addFeedback: builder.mutation<IFeedback, Omit<IFeedback, '_id'>>({
            query: (feedback: IFeedback) => ({
                url: '/feedbacks', feedback,
                method: "POST",
                body: feedback,
            }),
            invalidatesTags: ['Feedback'],

        }),
        removeFeedback: builder.mutation({
            query: (id: string) => ({
                url: `/feedbacks/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['Feedback']
        }),
        approveFeedback: builder.mutation<IFeedback, Partial<IFeedback> & Pick<IFeedback, '_id'>>({
            query: (id: any) => ({
                url: `/feedbacks/${id}/duyet`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Feedback']
        }),
        refuseFeedback: builder.mutation<IFeedback, Partial<IFeedback> & Pick<IFeedback, '_id'>>({
            query: (id: any) => ({
                url: `/feedbacks/${id}/tuchoi`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Feedback']
        }),
    })
})
export const { useGetFeedbackQuery, useGetFeedbacksByUIdQuery, useGetFeedbacksQuery, useAddFeedbackMutation, useRemoveFeedbackMutation, useApproveFeedbackMutation, useRefuseFeedbackMutation } = feedbackApi