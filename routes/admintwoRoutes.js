// const express = require('express');
import express from 'express';
const router = express.Router();
import db from '../models/index.js'; // Adjust the path as necessary
const { User, Class, Student, Subject, Attendance, StudentSubject } = db
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
// const { Op } = require('sequelize');
import {Op} from 'sequelize';

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id); // Assumes user ID is set from auth middleware
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Middleware to check if user is teacher
const isTeacher = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (user && user.role === 'teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Teacher only.' });
  }
};

// 1. Admin Register Teacher with Details and Classes
router.post('/admin/register-teacher', isAdmin, async (req, res) => {
  const { name, email, password, classIds } = req.body;

  try {
    // Validate input
    if (!name || !email || !password || !Array.isArray(classIds)) {
      return res.status(400).json({ message: 'Missing required fields or invalid classIds' });
    }

    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const teacher = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Associate teacher with classes
    const classes = await Class.findAll({ where: { id: classIds } });
    if (classes.length !== classIds.length) {
      return res.status(400).json({ message: 'One or more class IDs are invalid' });
    }
    await teacher.addClasses(classes);

    res.status(201).json({ message: 'Teacher registered successfully', teacherId: teacher.id });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Admin Register Student with Details and Subjects
router.post('/admin/register-student', isAdmin, async (req, res) => {
  const { first_name, last_name, class_id, parent_id, subjectIds } = req.body;

  try {
    // Validate input
    if (!first_name || !last_name || !class_id || !parent_id || !Array.isArray(subjectIds)) {
      return res.status(400).json({ message: 'Missing required fields or invalid subjectIds' });
    }

    // Check if class and parent exist
    const classExists = await Class.findByPk(class_id);
    const parentExists = await User.findByPk(parent_id);
    if (!classExists || !parentExists) {
      return res.status(400).json({ message: 'Invalid class_id or parent_id' });
    }

    // Create student
    const student = await Student.create({
      first_name,
      last_name,
      class_id,
      parent_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Associate student with subjects
    const subjects = await Subject.findAll({ where: { id: subjectIds } });
    if (subjects.length !== subjectIds.length) {
      return res.status(400).json({ message: 'One or more subject IDs are invalid' });
    }
    await student.addSubjects(subjects, { through: { createdAt: new Date(), updatedAt: new Date() } });

    res.status(201).json({ message: 'Student registered successfully', studentId: student.id });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 3. Teacher Get Students by Subject
router.get('/teacher/subject/:subjectId/students', isTeacher, async (req, res) => {
  const { subjectId } = req.params;

  try {
    // Verify subject exists and teacher is assigned to it
    const subject = await Subject.findOne({
      where: { id: subjectId, teacher_id: req.user.id },
    });
    if (!subject) {
      return res.status(403).json({ message: 'Subject not found or not assigned to teacher' });
    }

    // Get students enrolled in the subject
    const students = await Student.findAll({
      include: [
        {
          model: Subject,
          where: { id: subjectId },
          through: { attributes: [] },
        },
      ],
      attributes: ['id', 'first_name', 'last_name'],
    });

    res.json(students);
  } catch (error) {
    console.error('Error fetching students for subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 3. Teacher Mark Attendance
router.post('/teacher/mark-attendance', isTeacher, async (req, res) => {
  const { subjectId, studentId, date, status } = req.body;

  try {
    // Validate input
    if (!subjectId || !studentId || !date || !['present', 'absent'].includes(status)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Verify subject and teacher
    const subject = await Subject.findOne({
      where: { id: subjectId, teacher_id: req.user.id },
    });
    if (!subject) {
      return res.status(403).json({ message: 'Subject not found or not assigned to teacher' });
    }

    // Verify student is enrolled in subject
    const studentSubject = await StudentSubject.findOne({
      where: { student_id: studentId, subject_id: subjectId },
    });
    if (!studentSubject) {
      return res.status(400).json({ message: 'Student not enrolled in this subject' });
    }

    // Create or update attendance
    await Attendance.upsert({
      student_id: studentId,
      subject_id: subjectId,
      date: new Date(date),
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;