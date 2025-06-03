// File: routes/admin.js

import express from "express";
const router = express.Router();
import { Op } from 'sequelize';
import db from '../models/index.js';
const { Attendance, Student, Grade, Class, User, Activity } = db;

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const students = await Student.count();
    const teachers = await User.count({
      where: {
        role: 'teacher'
      }
    });
    const classes = await Class.count();
    res.json({ students, teachers, classes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/attendance/monthly
router.get("/attendance/monthly", async (req, res) => {
  try {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const results = await Attendance.findAll({
      attributes: [
        [Attendance.sequelize.fn("MONTH", Attendance.sequelize.col("date")), "month"],
        [Attendance.sequelize.fn("AVG", Attendance.sequelize.col("percentage")), "attendance"]
      ],
      group: ["month"]
    });
    const formatted = results.map(r => ({
      name: months[r.dataValues.month - 1],
      attendance: parseFloat(r.dataValues.attendance)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});

// GET /api/admin/notifications
router.get("/notifications", async (req, res) => {
  try {
    const absentStudents = await Student.count({
      include: [{
        model: Attendance,
        where: {
          status: "absent",
          date: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }]
    });

    const notifications = [
      {
        type: "absence",
        message: `${absentStudents} students have been absent for more than 3 days this week.`
      },
      {
        type: "grades",
        message: "New grade reports are due Friday."
      },
      {
        type: "schedule",
        message: "Class schedules updated for Grade 10."
      }
    ];

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// GET /api/admin/activity
router.get("/activity", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]]
    });
    const formatted = activities.map(a => ({
      user: a.user,
      activity: a.action,
      time: a.createdAt.toLocaleString()
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

export default router;
