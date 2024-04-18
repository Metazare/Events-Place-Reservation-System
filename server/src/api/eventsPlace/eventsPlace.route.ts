import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';
import { createEventsPlace, getEventsPlace, editEventsPlace } from './eventsPlace.controller';
import { Router } from 'express';

const router = Router();

router.get('/', asynchronousHandler(getEventsPlace));

router.post('/', asynchronousHandler(createEventsPlace));

router.use(authenticate);

router.get('/owned', asynchronousHandler(getEventsPlace));

router.patch('/', asynchronousHandler(editEventsPlace));

export default router;
