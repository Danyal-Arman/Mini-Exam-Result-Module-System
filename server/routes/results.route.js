import express from 'express';

import { createResult, ListResults, getResultById, deleteResult, getResultsByStudentId } from '../controller/results.controller.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(verifyAdmin);

router.post('/', createResult);
router.get('/', ListResults);
router.get('/:id', getResultById);
router.get('/student/:studentId', getResultsByStudentId);
router.delete('/:id', deleteResult);


export default router;