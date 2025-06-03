import express from 'express';
import attendanceRoutes from './routes/attendanceRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import classRoutes from './routes/classRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import admintwoRoutes from './routes/admintwoRoutes.js';

import cors from 'cors';


const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));


app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/admin', admintwoRoutes);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

