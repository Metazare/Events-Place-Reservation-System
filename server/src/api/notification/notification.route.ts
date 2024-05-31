import { getNotifications, readNotification, createNotification } from "./notification.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router = Router();

router.post('/', asynchronousHandler(createNotification));
router.get('/', asynchronousHandler(getNotifications));
router.patch('/', asynchronousHandler(readNotification));

export default router;