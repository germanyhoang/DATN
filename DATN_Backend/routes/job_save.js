import { Router } from "express";
import { addJobSave, getJobSavesByUserId, remove } from "../controllers/job_save";

const router = Router()

router.get('/jobsave/:userId', getJobSavesByUserId)
router.post('/jobsave', addJobSave)
router.delete('/jobsave/:id', remove)
export default router