import db  from '../models/index.js';
  const {Grade} = db


export const addGrade = async (req, res) => {
  try {
    const { student_id, subject_id, score, grade_value, grade_type, graded_at } = req.body;
    const grade = await Grade.create({ student_id, subject_id, score, grade_value, grade_type, graded_at  });
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
