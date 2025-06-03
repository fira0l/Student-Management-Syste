// controllers/parentController.js
import db from '../models/index.js';
const { Attendance, Grade ,Subject} = db;
import { Op } from 'sequelize';
// import { format } from 'date-fns';

// Helper to calculate ISO week number (ISO-8601 standard)
// function getWeekNumber(date) {
//   const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
//   const dayNum = d.getUTCDay() || 7; // Sunday = 7
//   d.setUTCDate(d.getUTCDate() + 4 - dayNum); // Adjust to Thursday of the week
//   const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
//   return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
// }

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

// Helper to generate an array of the last 28 days, excluding weekends
function getLast28Days(today, includeWeekends = false) {
  const days = [];
  let count = 0;
  let i = 0;
  while (count < 28) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    if (includeWeekends || (date.getDay() !== 0 && date.getDay() !== 6)) {
      days.push(new Date(date));
      count++;
    }
    i++;
  }
  return days.reverse(); // Oldest to newest
}

// Helper to format date as YYYY-MM-DD
function formatDateToYYYYMMDD(date) {
  const d = new Date(date); // Safely convert input to Date
  return d.toISOString().split('T')[0];
}


export const getChildAttendanceLast28Days = async (req, res) => {
  const student_id = req.params.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const past28Days = new Date(today);
  past28Days.setDate(today.getDate() - 27); // 28 days including today

  try {
    // Fetch attendance records
    const attendanceRecords = await Attendance.findAll({
      where: {
        student_id,
        date: {
          [Op.between]: [formatDateToYYYYMMDD(past28Days), formatDateToYYYYMMDD(today)],
        },
      },
      order: [['date', 'ASC']],
    });

    // console.log('Attendance records:', attendanceRecords);

    // Generate 28-day array for school days
    const validDays = getLast28Days(today, false); // Exclude weekends
    const attendanceArray = validDays.map((targetDate) => {
      const targetDateStr = formatDateToYYYYMMDD(targetDate);
      const match = attendanceRecords.find(
  (record) => formatDateToYYYYMMDD(record.date) === targetDateStr
);

      console.log(`Checking date: ${targetDateStr}, Match found:`, match);
      // If a record exists for this date, return its presence status
      if (match) {
        console.log(`Attendance for ${targetDateStr}:`, match.present);
      }
      return match ? match.present : false; // Default to absent if no record
    });

    res.json(attendanceArray);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: error.message || 'Server error fetching attendance' });
  }
};
//  = require('../models'); // Assuming Sequelize models are defined
// const { Op } = require('sequelize');

const getChildGradeTrends = async (req, res) => {
  const student_id = req.params.id;

  try {
    // Fetch grades for the last 4 weeks
    const today = new Date();
    const past28Days = new Date(today);
    past28Days.setDate(today.getDate() - 27);

    const grades = await Grade.findAll({
      where: {
        student_id,
        createdAt: {
          [Op.between]: [past28Days, today],
        },
      },
      include: [
        {
          model: Subject,
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    const weekMap = new Map();
    const subjects = new Set();

    // Aggregate grades by week
    grades.forEach((grade) => {
      const date = new Date(grade.createdAt);
      if (isNaN(date.getTime())) {
        console.warn('Invalid date for grade:', grade.createdAt);
        return;
      }

      const year = date.getFullYear();
      const weekNum = getWeekNumber(date); // Ensure getWeekNumber is defined
      const weekKey = `W${weekNum}-${year}`; // e.g., W1-2025
      const subjectName = grade.Subject ? grade.Subject.name : 'Unknown'; // Handle cases where Subject might be null
      subjects.add(subjectName);

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, { week: weekKey });
      }

      const weekData = weekMap.get(weekKey);
      // Use grade_value instead of score, convert to number for consistency
      weekData[subjectName] = grade.grade_value ? parseFloat(grade.grade_value) : null;
    });

    // Ensure all weeks have all subjects, defaulting to null if no grade
    const result = Array.from(weekMap.entries()).map(([week, data]) => {
      const weekData = { week };
      subjects.forEach((subject) => {
        weekData[subject] = data[subject] !== undefined ? data[subject] : null;
      });
      return weekData;
    });

    // Sort by week and year to ensure chronological order
    result.sort((a, b) => {
      const [aWeek, aYear] = a.week.split('-').map((s, i) => (i === 0 ? parseInt(s.replace('W', '')) : parseInt(s)));
      const [bWeek, bYear] = b.week.split('-').map((s, i) => (i === 0 ? parseInt(s.replace('W', '')) : parseInt(s)));
      return aYear === bYear ? aWeek - bWeek : aYear - bYear;
    });

    // Return empty array if no grades to avoid frontend errors
    res.json(result.length > 0 ? result : []);
  } catch (error) {
    console.error('Error fetching grade trends:', error);
    res.status(500).json({ message: 'Server error fetching grade trends' });
  }
};
// Utility function to get week number (ISO week)


export { getChildGradeTrends };