import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';
import { createEventsPlace, getEventsPlace, editEventsPlace, deleteEventsPlace } from './eventsPlace.controller';
import { Router } from 'express';

const router = Router();

router.get('/', asynchronousHandler(getEventsPlace));

router.use(authenticate);

router.post('/', asynchronousHandler(createEventsPlace));

router.get('/owned', asynchronousHandler(getEventsPlace));

router.patch('/', asynchronousHandler(editEventsPlace));

router.delete('/', asynchronousHandler(deleteEventsPlace));

export default router;
