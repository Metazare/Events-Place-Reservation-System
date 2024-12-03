import { 
    getCMSData,
    createOrUpdateCMSData
} from './cms.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = Router();

// Route to get CMS data
router.get("/", asynchronousHandler(getCMSData));

// Route to create or update CMS data
router.post("/", asynchronousHandler(createOrUpdateCMSData));

export default router;
