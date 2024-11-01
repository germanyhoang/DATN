import express from "express";
import { BlockUser, UnlockUser, deleteUser, detailUser, listUser, signin, signup, updateUser,searchUserById } from "../../controllers/admin/auth";

const router = express.Router()
router.post('/signup', signup)
router.post('/signin', signin)


router.get('/users', listUser)
router.delete('/users/:id', deleteUser)
router.get('/users/:email/detail', detailUser)
router.get('/users/:id',searchUserById)
router.patch('/users', updateUser)
router.put('/users/block',BlockUser)
router.put('/users/unlock',UnlockUser)
export default router