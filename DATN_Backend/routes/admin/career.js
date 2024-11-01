import { Router } from "express";
import { 
  addCareer, 
  editCareer, 
  getCareers, 
  removeCareer, 
  searchCareer 
} from "../../controllers/admin/career";

const router = Router();

router.get("/careers", getCareers);
router.post("/careers", addCareer);
router.delete("/careers/:id", removeCareer);
router.post("/search", searchCareer);
router.put("/careers/edit/:id", editCareer);
export default router;
