import api from './axios';

export const fetchAttendances = () => api.get('/api/attendance');
export const markAttendance = (attendanceData) => api.post('/api/attendance', attendanceData);
