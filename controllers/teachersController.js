import db from '../models/index.js';
const {Class, User} = db;

export const teacherClasses = async (req, res) => {
  try {
    const { teacher_id } = req.params;
    const classes = await Class.findAll({
      where: { teacher_id },
      attributes: ['id', 'name'],
    });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await User.findOne({
            where: { id, role: 'teacher' },
            attributes: ['id', 'name', 'email'],
        });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json(teacher);
    } catch (err) {
        console.error('Error fetching teacher:', err);
        res.status(500).json({ error: 'Server error fetching teacher' });
    }
}
