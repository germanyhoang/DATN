import { Router } from "express";
import {
    addPost,
    editPost,
    getPost,
    getPostsByUserId,
    getPosts,
    removePost,
    searchPostByName,
    getPostsDefUserId,
    searchPost,
    duyet,
    tuchoi,
    getMyPosts,
    addMyPost,
    removeMyPost,
    jobCountByCareer,
    countNewCandidates,
    resetNewCandidates,
     
} from "../controllers/post";

const router = Router()

router.get('/posts', getPosts)
router.get('/posts/my-posts', getMyPosts)
router.get('/posts/:id/detail', getPost)
router.get('/posts/:userId', getPostsByUserId)
router.get('/posts/:userId/def', getPostsDefUserId)
router.post('/posts', addPost)
router.put('/posts/:id/my-post', addMyPost)
router.delete('/posts/:id/my-post', removeMyPost)
router.put('/posts/:id', editPost)
router.put('/posts/:id/duyet', duyet)
router.put('/posts/:id/tuchoi', tuchoi)
router.delete('/posts/:id', removePost)
router.get('/search', searchPost)
router.post('/posts?q=', searchPostByName)
router.get('/jobCountByCareer/:career', jobCountByCareer);
router.post('/posts/count-new-candidate', countNewCandidates)
router.post('/posts/reset-new-candidate', resetNewCandidates)
export default router