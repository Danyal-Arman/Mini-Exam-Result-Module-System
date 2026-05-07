import express from 'express';

const router = express.Router();

import { loginAdmin, getAdminProfile } from '../controller/auth.controller.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

router.post('/login', loginAdmin);
router.get('/get-admin-profile',verifyAdmin, getAdminProfile);

export default router;  