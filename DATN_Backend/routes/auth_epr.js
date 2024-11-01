import express from "express";
import {
    changePassEpr,
    deleteUser,
    detailUser,
    finalActive,
    forgotPasswordEpr,
    getUser,
    listUser,
    resetPassword,
    sendEmailVerified,
    signinNTD,
    signupNTD,
    updateUserEpr
} from "../controllers/auth_epr";
import { sendMail, sendMaill } from "../controllers/auth_epe";

const router = express.Router()
router.post('/signup/ntd', signupNTD)
router.post('/signin/ntd', signinNTD)


router.get('/epr-users', listUser)
router.post('/epr-users/forgotpassword', forgotPasswordEpr)
router.put('/epr-users/resetpassword', resetPassword)
router.post('/epr-users/sendmail', sendMaill)
router.put('/epr-users/changepassepr', changePassEpr)
router.post('/epr-users/verifiedemail', sendEmailVerified)
router.post('/epr-users/activeEmail', finalActive)
router.delete('/epr-users/:id', deleteUser)
router.put('/epr-users/:id/edit', updateUserEpr)
router.get('/epr-users/:email/detail', detailUser)
router.get('/epr-users/:id', getUser)
export default router