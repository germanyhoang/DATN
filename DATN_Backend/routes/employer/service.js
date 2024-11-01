import { Router } from "express";
import { addService, getServicesByUId, removeService } from "../../controllers/employer/service";

const router = new Router()

router.get('/services/:uid', getServicesByUId)
router.post('/services', addService)
router.delete('/services/:id', removeService)


export default router