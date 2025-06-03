import express from 'express';
import { createStudent, getStudents, getStudentByClass } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:class_id', getStudentByClass); // Assuming this is for getting students by class

export default router;
