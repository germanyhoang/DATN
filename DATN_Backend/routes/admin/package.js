import { Router } from "express";
import { create, list, read, remove, updatePackage } from "../../controllers/admin/package";

const router = new Router()

router.get('/ad-packages', list)
router.get('/ad-packages/:id', read)
router.post('/ad-packages', create)
router.put('/ad-packages/:id', updatePackage)
router.delete('/ad-packages/:id', remove)

export default router