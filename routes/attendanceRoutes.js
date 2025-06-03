import express from 'express';
import { markAttendance, getAllAttendance , updateAttendance} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', markAttendance);
router.get('/', getAllAttendance)
router.put('/:id', updateAttendance);

export default router;
