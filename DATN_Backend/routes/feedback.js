import { Router } from "express";
import { addFeedBack, approveFeedback, getFeedBack, getFeedBacks, getFeedbackByUId, refuseFeedback, removeFeedback } from "../controllers/feedback";

const router = Router();

router.get('/feedbacks', getFeedBacks);
router.get('/feedbacks/:id', getFeedBack);
router.get('/feedbacks/:userId/list', getFeedbackByUId)
router.post('/feedbacks', addFeedBack);
router.delete('/feedbacks/:id', removeFeedback);
router.put('/feedbacks/:id/duyet', approveFeedback)
router.put('/feedbacks/:id/tuchoi', refuseFeedback)
export default router;