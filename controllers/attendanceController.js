import db from '../models/index.js';
const { Attendance } = db;


export const markAttendance = async (req, res) => {
  try {
    const { student_id, subject_id, date, status } = req.body;
    const attendance = await Attendance.create({ student_id, subject_id, date, status });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const attendance = await Attendance.findByPk(id);
    
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    attendance.status = status;
    await attendance.save();
    
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};