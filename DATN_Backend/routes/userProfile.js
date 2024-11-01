import { Router } from "express";
import { addInfo, getInfo, updateInfo } from "../controllers/userProfile";

const router = Router()

router.get('/info', getInfo)
router.post('/info-add', addInfo)
router.put('/info-edit', updateInfo)

export default router