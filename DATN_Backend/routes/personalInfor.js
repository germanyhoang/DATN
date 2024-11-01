import { Router } from "express";
import { editPersonalInfor, getPersonalInfor, getPersonalInfors } from "../controllers/personalInfor";

const router = Router();

router.get('/personalInfors', getPersonalInfors);
router.get('/personalInfors/:id', getPersonalInfor);
router.put('/personalInfors/:id', editPersonalInfor);

export default router;