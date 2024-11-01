import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ISendmail from "../../interface/employer/sendmail";

export const sendMailApi: any = createApi({
    reducerPath: 'sendMailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['sendmail'],
    endpoints: (builder: any) => ({
        sendEmail: builder.mutation({
            query: (sendmail: ISendmail) => ({
                url: '/epr-users/sendmail', sendmail,
                method: 'POST',
                body: sendmail
            }),
            invalidatesTags: ['sendmail']
        })
    })
})
export const refuseSendMailApi: any = createApi({
    reducerPath: 'refuseSendMailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['refusesendmail'],
    endpoints: (builder: any) => ({
        sendEmail: builder.mutation({
            query: (sendmail: ISendmail) => ({
                url: '/epr-users/sendmail', sendmail,
                method: 'POST',
                body: sendmail
            }),
            invalidatesTags: ['sendmail']
        })
    })
})

export const {
    useSendEmailMutation,
} = sendMailApi