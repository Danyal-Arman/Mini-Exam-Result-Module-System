import express from 'express';

const router = express.Router();

import { loginAdmin, getAdminProfile } from '../controller/auth.controller.js';

router.post('/login', loginAdmin);
router.get('/get-admin-profile', getAdminProfile);

export default router;  