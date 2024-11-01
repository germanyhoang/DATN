import { Router } from "express";
import { createBanner, listBanner, readBanner, updateBanner } from "../../controllers/admin/banner";

const router = Router()
router.put('/banners/change-banner', updateBanner);
router.post('/banners/create',createBanner);
router.get('/banners', listBanner);
router.get('/banners/:id', readBanner);

export default router;