import { Router } from "express";
import { addNotification, editNotification, getNotification, getNotifications,getNotificationEmail } from "../controllers/notification";

const router = Router()

router.get('/notifications', getNotifications);
router.get('/notifications/:id', getNotification);
router.post('/notifications', addNotification);
router.put('/notifications/:id', editNotification);
router.get('/notificationsByEmail/:email',getNotificationEmail);
export default router;