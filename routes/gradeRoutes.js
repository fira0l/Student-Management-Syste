import express from 'express';
import { addGrade, getAllGrades } from '../controllers/gradeController.js';

const router = express.Router();

router.post('/', addGrade);
router.get('/', getAllGrades);

export default router;
