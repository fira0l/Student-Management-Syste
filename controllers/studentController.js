import db from '../models/index.js';
const {Student} = db

export const createStudent = async (req, res) => {
  try {
    const { first_name, last_name, class_id, parent_id } = req.body;
    const student = await Student.create({ first_name, last_name, class_id, parent_id });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentByClass = async (req, res) => {
  try {
    const { class_id } = req.params;
    const students = await Student.findAll({ where: { class_id } });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
