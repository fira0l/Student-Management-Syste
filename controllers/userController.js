import db from '../models/index.js';
const { User , Student} = db
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const User = require('./models/User');
// const bcrypt = require('bcrypt');

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req,res)=> {
  try {
    // Hash password here (if not using hook)
    const salt = await bcrypt.genSalt(10);
    const {name,email,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    const first_name = name.split(' ')[0] || '';
    const last_name = name.split(' ')[1] || '';

    if (role == 'student') {
      const student = await Student.create({
        first_name, last_name, parent_id: 1, class_id: 1
      });
      console.log('Student created:', student.toJSON());
      res.json(student);
      return student;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log('User created:', user.toJSON());
    res.json(user)
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
// Example usage
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
