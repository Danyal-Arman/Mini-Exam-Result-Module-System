import express from 'express';

import { createStudent, listStudents, getStudentById, updateStudentById, deleteStudentById } from '../controller/student.controller.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(verifyAdmin);

router.post('/', createStudent);
router.get('/', listStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);


export default router; 