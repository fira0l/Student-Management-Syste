// routes/parentRoutes.js
import express from 'express';  
const router = express.Router();

import {getChildAttendanceLast28Days , getChildGradeTrends} from '../controllers/parentController.js';

router.get('/child/:id/attendance-last-28-days', getChildAttendanceLast28Days);
// routes/parentRoutes.js
router.get('/child/:id/grade-trends', getChildGradeTrends);


export default router;