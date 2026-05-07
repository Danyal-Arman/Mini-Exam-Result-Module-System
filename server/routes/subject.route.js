
import express from 'express';

import { createSubject, ListSubjects, getSubjectById, updateSubjectById, deleteSubjectById } from '../controller/subject.controller.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(verifyAdmin);

router.post('/', createSubject);
router.get('/', ListSubjects);
router.get('/:id', getSubjectById);
router.put('/:id', updateSubjectById);
router.delete('/:id', deleteSubjectById);


export default router;