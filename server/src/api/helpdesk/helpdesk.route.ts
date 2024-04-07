import { 
    createHelpdeskReport, 
    createHelpdeskResponse, 
    getHelpdeskEntry 
} from './helpdesk.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = Router();

router.post('/report', asynchronousHandler(createHelpdeskReport));

router.post('/respond', asynchronousHandler(createHelpdeskResponse));

router.get('/', asynchronousHandler(getHelpdeskEntry));

export default router;
