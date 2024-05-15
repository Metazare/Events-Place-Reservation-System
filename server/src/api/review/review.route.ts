import { createReview, getReviews } from './review.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = Router();

router.get('/', asynchronousHandler(getReviews));

router.post('/', asynchronousHandler(createReview));

export default router;
