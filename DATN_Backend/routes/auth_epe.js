import express from "express";
import {
    listUser,
    deleteUser,
    detailUser,
    signupNTV,
    signinNTV,
    forgotPasswordEpe,
    resetPassword,
    changePass,
    updateUser,
    sendEmailVerified,
    finalActive,
    changeAvatar,
    saveCV,
    getUser,
    appliedJob,
    changeAplliedStatus,
    searhCompany,
} from "../controllers/auth_epe";

const router = express.Router()

router.post('/signup/ntv', signupNTV)
router.post('/signin/ntv', signinNTV)

router.get('/epe-users', listUser)
router.post('/epe-users/forgotpassword', forgotPasswordEpe)
router.put('/epe-users/resetpassword', resetPassword)
router.put('/epe-users/changepassword', changePass)
router.put('/epe-users/change-avatar', changeAvatar)
router.put('/epe-users/save-cv', saveCV)
router.put('/epe-users/applied-job', appliedJob)
router.put('/epe-users/change-applied-status', changeAplliedStatus)
router.post('/epe-users/verifiedemail', sendEmailVerified)
router.post('/epe-users/activeEmail', finalActive)
router.delete('/epe-users/:id', deleteUser)
router.put('/epe-users/:id/edit', updateUser)
router.get('/epe-users/:email/detail', detailUser)
router.get('/epe-users/:id', getUser)

router.get('/company', searhCompany)
export default router