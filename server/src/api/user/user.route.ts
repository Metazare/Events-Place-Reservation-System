import { editCredentials, editInfo, getUsers } from "./user.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get('/', asynchronousHandler(getUsers));

router.use(authenticate);

router.patch('/', asynchronousHandler(editInfo));

router.patch('/credentials', asynchronousHandler(editCredentials));

export default router;