import { Router } from "express";
import { addProfile, getProfile, getProfiles, updateProfile } from "../controllers/profile_employer";

const router = Router()

router.get('/epr-profiles', getProfiles)
router.get('/epr-profiles/:email', getProfile)
router.post('/epr-profiles', addProfile)
router.put('/epr-profiles/:id', updateProfile)

export default router