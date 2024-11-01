import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import IPost from "../interface/post"
import ICareer from "../interface/admin/career"
export const postApi: any = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        jobCountByCareer: builder.query<ICareer[], string>({
            query: (id: string) => `/jobCountByCareer/${id}`,
            providesTags: ['Post']
        }),
        getPosts: builder.query<IPost[], void>({
            query: (id: any) => `/posts?id=${id}`,
            providesTags: ['Post']
        }),
        getMyPosts: builder.query<IPost[], void>({
            query: () => '/posts/my-posts',
            providesTags: ['Post']
        }),
        getPostsByCareer: builder.query<IPost, string>({
            query: (query: any) => `/posts?career=${query['career']}&id=${query['id']}`,
            providesTags: ['Post']
        }),
        getPost: builder.query<IPost, string>({
            query: (id: string) => `/posts/${id}/detail`,
            providesTags: ['Post']
        }),
        getGoodPosts: builder.query<IPost, string>({
            query: (id: string) => `/posts?goodjob=true`,
            providesTags: ['Post']
        }),
        getPostsByUId: builder.query<IPost[], string>({
            query: (uid: string) => `/posts/${uid}`,
            providesTags: ['Post']
        }),
        getPostsDefUId: builder.query<IPost[], string>({
            query: (uid: string) => `/posts/${uid}/def`,
            providesTags: ['Post']
        }),
        addPost: builder.mutation<IPost, Omit<IPost, '_id'>>({
            query: (post: IPost) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        addMyPost: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (post: IPost) => ({
                url: `/posts/${post._id}/my-post`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        removeMyPost: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (post: IPost) => ({
                url: `/posts/${post._id}/my-post`,
                method: 'DELETE',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (post: IPost) => ({
                url: `/posts/${post._id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        removePost: builder.mutation({
            query: (id: string) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                credentials: 'omit'
            }),
            invalidatesTags: ['Post']
        }),
        approvePost: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (id: any) => ({
                url: `/posts/${id}/duyet`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Post']
        }),
        refusePost: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (id: any) => ({
                url: `/posts/${id}/tuchoi`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Post']
        }),
        countNewCandidates: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (id: any) => ({
                url: `/posts/count-new-candidate`,
                method: 'POST',
                body: id
            }),
            invalidatesTags: ['Post']
        }),
        resetNewCandidates: builder.mutation<IPost, Partial<IPost> & Pick<IPost, '_id'>>({
            query: (id: any) => ({
                url: `/posts/reset-new-candidate`,
                method: 'POST',
                body: id
            }),
            invalidatesTags: ['Post']
        }),
    })
})

export const formatDate = (inputDate: string): any => {
    const date = new Date(inputDate);
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "2-digit" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    const time = date.toLocaleTimeString("en-US", options);

    return { date: `${day}-${month}-${year}`, time };
}

export const {
    useJobCountByCareerQuery,
    useGetPostsQuery,
    useGetMyPostsQuery,
    useGetPostsByCareerQuery,
    useGetPostsByUIdQuery,
    useGetPostsDefUIdQuery,
    useGetPostQuery,
    useAddPostMutation,
    useAddMyPostMutation,
    useRemoveMyPostMutation,
    useEditPostMutation,
    useRemovePostMutation,
    useApprovePostMutation,
    useRefusePostMutation,
    useGetGoodPostsQuery,
    useCountNewCandidatesMutation,
    useResetNewCandidatesMutation,
} = postApi