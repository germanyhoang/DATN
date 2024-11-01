import { Router } from "express";
import { addServiceAdm, getServicesAdm } from "../../controllers/admin/service";

const router = new Router()

router.get('/ad-services', getServicesAdm)
router.post('/ad-services', addServiceAdm)
export default router;