import { editCredentials, editInfo, forgotPassword, getUsers, resetPassword } from "./user.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get('/', asynchronousHandler(getUsers));

router.post('/password/forgot', asynchronousHandler(forgotPassword));

router.post('/password/reset', asynchronousHandler(resetPassword));

router.use(authenticate);

router.patch('/', asynchronousHandler(editInfo));

router.patch('/credentials', asynchronousHandler(editCredentials));

export default router;