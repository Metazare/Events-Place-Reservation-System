import { getNotifications, createNotification, readNotification } from "./notification.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

router.get('/', asynchronousHandler(getNotifications));

router.post('/', asynchronousHandler(createNotification));

router.patch('/', asynchronousHandler(readNotification));

export default router;