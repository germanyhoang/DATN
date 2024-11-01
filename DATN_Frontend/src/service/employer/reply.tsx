import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IReply from "../../interface/employer/reply";

export const replyApi = createApi({
    reducerPath: 'replyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['reply'],
    endpoints: (builder: any) => ({
        getReplys: builder.query({
            query: () => '/replys',
            providesTags: ['reply']
        }),
        getReplyUId: builder.query({
            query: (uid: string) => `/replys/${uid}/list`,
            providesTags: ['reply']
        }),
        createReply: builder.mutation({
            query: (reply: IReply) => ({
                url: `/replys`,
                method: 'POST',
                body: reply
            }),
            invalidatesTags: ['reply']
        })
    })
})

export const {
    useGetReplysQuery,
    useGetReplyUIdQuery,
    useCreateReplyMutation
} = replyApi