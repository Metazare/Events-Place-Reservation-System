import asynchronousHandler from '../../middlewares/asynchronousHandler';
import { createEventsPlace, deleteEventsPlace, getEventsPlace, updateEventsPlace } from './eventsPlace.controller';
import { Router } from 'express';

const router = Router();

router.get('/', asynchronousHandler(getEventsPlace));

router.post('/', asynchronousHandler(createEventsPlace));

router.patch('/', asynchronousHandler(updateEventsPlace));

router.delete('/', asynchronousHandler(deleteEventsPlace));

export default router;
