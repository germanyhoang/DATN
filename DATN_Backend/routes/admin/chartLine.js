import { Router } from "express";
import { TotalUser } from "../../controllers/admin/chartLine";

const router = Router()

router.get('/chartLine', TotalUser)

export default router