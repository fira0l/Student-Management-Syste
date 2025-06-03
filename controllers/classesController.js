import db from '../models/index.js';
const { Class } = db;

export const createClass = async (req, res) => {
  try {
    const { name, teacher_id } = req.body;
    const newClass = await Class.create({ name,teacher_id });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};