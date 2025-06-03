import db from '../models/index.js';
const { Subject } = db

export const createSubject = async (req, res) => {
  try {
    const { name, teacher_id, class_id } = req.body;
    const subject = await Subject.create({ name, teacher_id, class_id });
    if (!subject) {
      return res.status(400).json({ error: 'Subject creation failed' });
    }
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
