import api from './axios';

export const fetchGrades = () => api.get('/api/grades');
export const addGrade = (gradeData) => api.post('/api/grades', gradeData);
