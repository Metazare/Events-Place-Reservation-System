import { createReview, getReviews } from "./review.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get("/", asynchronousHandler(getReviews));

// router.use(authenticate);

router.post("/", asynchronousHandler(createReview));

export default router;
