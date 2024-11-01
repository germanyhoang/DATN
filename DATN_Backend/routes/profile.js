import { Router } from "express";
import { list, read, remove, add } from "../controllers/profile";

const router = Router();

router.get('/profiles', list);
router.get('/profiles/:email', read);
router.post('/profiles', add);
router.delete('/profiles/:id', remove);

export default router;