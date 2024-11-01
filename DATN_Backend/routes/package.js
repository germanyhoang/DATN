import { Router } from "express";
import {
    createPackage,
    listPackages,
    readPackage,
    removePackage
} from "../controllers/package";

const router = new Router()

router.get('/packages/:uid', listPackages)
router.get('/packages/:id', readPackage)
router.post('/packages', createPackage)
router.delete('/packages/:id', removePackage)

export default router