import express from 'express';

import { getDashboardData } from '../controller/dashboard.controller.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';


const router = express.Router();
router.use(verifyAdmin);
router.get('/', getDashboardData);


export default router;