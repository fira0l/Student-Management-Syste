// import React from 'react';

// export default function ParentDashboard() {
//   // Dummy data
//   const children = [
//     {
//       id: 1,
//       name: 'Sara Johnson',
//       class: 'Grade 5 - Section A',
//       attendanceRate: 96,
//       recentGrades: [
//         { subject: 'Math', grade: 'A' },
//         { subject: 'Science', grade: 'B+' },
//         { subject: 'English', grade: 'A-' },
//       ],
//     },
//     {
//       id: 2,
//       name: 'Michael Johnson',
//       class: 'Grade 2 - Section B',
//       attendanceRate: 92,
//       recentGrades: [
//         { subject: 'Math', grade: 'B' },
//         { subject: 'Science', grade: 'A' },
//         { subject: 'English', grade: 'B+' },
//       ],
//     },
//   ];

//   const notifications = [
//     'Parent-teacher meeting scheduled for June 10, 2025.',
//     'Sara has improved her attendance this month.',
//     'School closed on June 15 due to public holiday.',
//   ];

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-12 text-gray-900">Parent Dashboard</h2>

//       {/* Children Overview */}
//       <section className="mb-14">
//         <h3 className="text-2xl font-semibold mb-8 text-gray-800">My Children</h3>
//         <div className="space-y-10">
//           {children.map((child) => (
//             <div
//               key={child.id}
//               className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="text-2xl font-semibold text-gray-900">{child.name}</h4>
//                   <p className="text-gray-600 mt-1">{child.class}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-medium text-gray-700">
//                     Attendance: <span className="font-semibold">{child.attendanceRate}%</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Recent Grades */}
//               <div className="mt-4">
//                 <h5 className="font-semibold text-gray-800 mb-3">Recent Grades</h5>
//                 <div className="flex flex-wrap gap-4">
//                   {child.recentGrades.map(({ subject, grade }) => (
//                     <div
//                       key={subject}
//                       className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 font-semibold"
//                     >
//                       {subject}: {grade}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Notifications */}
//       <section>
//         <h3 className="text-2xl font-semibold mb-6 text-gray-800">Notifications</h3>
//         <ul className="list-disc list-inside bg-white rounded-3xl shadow-lg p-8 space-y-4 text-gray-700 font-medium tracking-wide">
//           {notifications.map((note, i) => (
//             <li key={i}>{note}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// function AttendanceCalendar({ attendanceData }) {
//   return (
//     <div className="grid grid-cols-7 gap-1 mt-4">
//       {attendanceData.map((present, idx) => (
//         <div
//           key={idx}
//           title={`Day ${idx + 1}: ${present ? 'Present' : 'Absent'}`}
//           className={`w-6 h-6 rounded cursor-default ${
//             present ? 'bg-green-500' : 'bg-red-400'
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

// export default function ParentDashboard() {
//   // State to track which child is expanded
//   const [expandedChildId, setExpandedChildId] = useState(null);

//   // Toggle expandable section
//   const toggleExpand = (id) => {
//     setExpandedChildId(expandedChildId === id ? null : id);
//   };

//   // Dummy data
//   const children = [
//     {
//       id: 1,
//       name: 'Sara Johnson',
//       class: 'Grade 5 - Section A',
//       attendanceRate: 96,
//       attendanceDays: [
//         true, true, true, false, true, true, true, true, true, true, false, true, true,
//         true, true, true, false, true, true, true, true, true, true, true, false, true,
//         true, true, true,
//       ],
//       gradeTrends: [
//         { week: 'W1', Math: 88, Science: 85, English: 90 },
//         { week: 'W2', Math: 90, Science: 87, English: 92 },
//         { week: 'W3', Math: 92, Science: 89, English: 91 },
//         { week: 'W4', Math: 94, Science: 90, English: 93 },
//       ],
//       recentGrades: [
//         { subject: 'Math', grade: 'A' },
//         { subject: 'Science', grade: 'B+' },
//         { subject: 'English', grade: 'A-' },
//       ],
//       teacherContact: 'teacher.sara@example.com',
//     },
//     {
//       id: 2,
//       name: 'Michael Johnson',
//       class: 'Grade 2 - Section B',
//       attendanceRate: 92,
//       attendanceDays: [
//         true, false, true, true, false, true, true, true, true, false, true, true, true,
//         true, true, false, true, true, true, true, true, true, false, true, true, true,
//         false, true, true, true,
//       ],
//       gradeTrends: [
//         { week: 'W1', Math: 75, Science: 80, English: 78 },
//         { week: 'W2', Math: 78, Science: 82, English: 80 },
//         { week: 'W3', Math: 80, Science: 83, English: 82 },
//         { week: 'W4', Math: 82, Science: 85, English: 85 },
//       ],
//       recentGrades: [
//         { subject: 'Math', grade: 'B' },
//         { subject: 'Science', grade: 'A' },
//         { subject: 'English', grade: 'B+' },
//       ],
//       teacherContact: 'teacher.michael@example.com',
//     },
//   ];

//   const notifications = [
//     'Parent-teacher meeting scheduled for June 10, 2025.',
//     'Sara has improved her attendance this month.',
//     'School closed on June 15 due to public holiday.',
//   ];

//   // Quick action handlers (dummy)
//   const requestReport = (childName) => alert(`Requested report for ${childName}`);
//   const contactTeacher = (email) => alert(`Opening email client to contact ${email}`);
//   const downloadAttendance = (childName) => alert(`Downloading attendance sheet for ${childName}`);

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-12 text-gray-900">Parent Dashboard</h2>

//       {/* Children Overview */}
//       <section className="mb-14">
//         <h3 className="text-2xl font-semibold mb-8 text-gray-800">My Children</h3>
//         <div className="space-y-10">
//           {children.map((child) => (
//             <div
//               key={child.id}
//               className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="text-2xl font-semibold text-gray-900">{child.name}</h4>
//                   <p className="text-gray-600 mt-1">{child.class}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-medium text-gray-700">
//                     Attendance: <span className="font-semibold">{child.attendanceRate}%</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Quick Action Buttons */}
//               <div className="flex gap-4 mb-6">
//                 <button
//                   onClick={() => requestReport(child.name)}
//                   className="bg-blue-600 text-white rounded-full px-5 py-2 font-semibold hover:bg-blue-700 transition"
//                 >
//                   Request Report
//                 </button>
//                 <button
//                   onClick={() => contactTeacher(child.teacherContact)}
//                   className="bg-green-600 text-white rounded-full px-5 py-2 font-semibold hover:bg-green-700 transition"
//                 >
//                   Contact Teacher
//                 </button>
//                 <button
//                   onClick={() => downloadAttendance(child.name)}
//                   className="bg-purple-600 text-white rounded-full px-5 py-2 font-semibold hover:bg-purple-700 transition"
//                 >
//                   Download Attendance
//                 </button>
//               </div>

//               {/* Expandable Details Toggle */}
//               <button
//                 onClick={() => toggleExpand(child.id)}
//                 className="text-blue-600 font-semibold mb-6 hover:underline"
//               >
//                 {expandedChildId === child.id ? 'Hide Details ▲' : 'Show Details ▼'}
//               </button>

//               {/* Expandable Content */}
//               {expandedChildId === child.id && (
//                 <>
//                   {/* Attendance Calendar */}
//                   <div>
//                     <h5 className="font-semibold text-gray-800 mb-2">Attendance Last 28 Days</h5>
//                     <AttendanceCalendar attendanceData={child.attendanceDays} />
//                   </div>

//                   {/* Recent Grades */}
//                   <div className="mt-6">
//                     <h5 className="font-semibold text-gray-800 mb-3">Recent Grades</h5>
//                     <div className="flex flex-wrap gap-4">
//                       {child.recentGrades.map(({ subject, grade }) => (
//                         <div
//                           key={subject}
//                           className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 font-semibold"
//                         >
//                           {subject}: {grade}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Grade Trends Chart */}
//                   <div className="mt-8" style={{ width: '100%', height: 200 }}>
//                     <h5 className="font-semibold text-gray-800 mb-3">Grade Trends</h5>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart
//                         data={child.gradeTrends}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
//                         <XAxis dataKey="week" stroke="#718096" fontWeight="600" />
//                         <YAxis stroke="#718096" fontWeight="600" />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="Math" stroke="#3b82f6" strokeWidth={3} />
//                         <Line type="monotone" dataKey="Science" stroke="#10b981" strokeWidth={3} />
//                         <Line type="monotone" dataKey="English" stroke="#f59e0b" strokeWidth={3} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Notifications */}
//       <section>
//         <h3 className="text-2xl font-semibold mb-6 text-gray-800">Notifications</h3>
//         <ul className="list-disc list-inside bg-white rounded-3xl shadow-lg p-8 space-y-4 text-gray-700 font-medium tracking-wide">
//           {notifications.map((note, i) => (
//             <li key={i}>{note}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import api from '../api/axios'; // Adjust this path as needed

// const ParentDashboard = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [gradeTrends, setGradeTrends] = useState([]);
//   const student_id = '4'; // Replace this with dynamic logic later

//   useEffect(() => {
//     api.get(`/api/parents/child/${student_id}/attendance-last-28-days`)
//       .then(res => setAttendance(res.data))
//       .catch(err => console.error('Error fetching attendance:', err));

//     api.get(`/api/parents/child/${student_id}/grade-trends`)
//       .then(res => setGradeTrends(res.data))
//       .catch(err => console.error('Error fetching grade trends:', err));
//   }, [student_id]);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Parent Dashboard</h1>

//       {/* Attendance Section */}
//       <div className="bg-white rounded-2xl shadow p-6 mb-10 border border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance (Last 28 Days)</h2>
//         <div className="grid grid-cols-7 gap-3 mb-3">
//           {attendance.map((present, index) => (
//             <div
//               key={index}
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shadow ${
//                 present ? 'bg-green-500' : 'bg-red-500'
//               }`}
//               title={`Day ${index + 1}`}
//             >
//               {index + 1}
//             </div>
//           ))}
//         </div>
//         <p className="text-sm text-gray-500">Green = Present, Red = Absent</p>
//       </div>

//       {/* Grade Trends Section */}
//       <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Grade Trends</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse text-sm">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="px-4 py-2 border font-semibold text-left">Week</th>
//                 {gradeTrends.length > 0 &&
//                   Object.keys(gradeTrends[0])
//                     .filter(key => key !== 'week')
//                     .map(subject => (
//                       <th key={subject} className="px-4 py-2 border font-semibold text-left capitalize">
//                         {subject}
//                       </th>
//                     ))}
//               </tr>
//             </thead>
//             <tbody>
//               {gradeTrends.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border font-medium text-gray-700">{row.week}</td>
//                   {Object.keys(row)
//                     .filter(key => key !== 'week')
//                     .map((subject, j) => (
//                       <td key={j} className="px-4 py-2 border text-gray-600">
//                         {row[subject]}
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentDashboard;
// src/pages/ParentDashboard.jsx

// src/pages/ParentDashboard.jsx
// src/pages/ParentDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { FiCalendar, FiTrendingUp, FiAward, FiClock, FiBell, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const ParentDashboard = ({ onLogout }) => {
  const [attendance, setAttendance] = useState([]);
  const [gradeTrends, setGradeTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Math assignment due tomorrow', color: 'bg-blue-500', read: false },
    { id: 2, message: 'Parent-teacher conference scheduled', color: 'bg-yellow-500', read: false },
    { id: 3, message: 'School holiday next Monday', color: 'bg-purple-500', read: true }
  ]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const student_id = user.student_id || '4'; // Fallback to '4'
  const userRole = user.role || 'parent';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, gradeTrendsRes] = await Promise.all([
          api.get(`/api/parents/child/${student_id}/attendance-last-28-days`),
          api.get(`/api/parents/child/${student_id}/grade-trends`)
        ]);
        setAttendance(Array.isArray(attendanceRes.data) ? attendanceRes.data : []);
        setGradeTrends(Array.isArray(gradeTrendsRes.data) ? gradeTrendsRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error(err.response?.data?.message || 'Failed to fetch data');
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student_id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
    navigate('/login', { replace: true });
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  // Calculate attendance stats
  const presentDays = attendance.filter(day => day).length;
  const attendanceRate = Math.round((presentDays / attendance.length) * 100) || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-400 rounded-full mb-4"></div>
          <div className="text-blue-600 font-medium">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole={userRole} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Child Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative" aria-label="Notifications">
              <FiBell className="text-gray-600" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
                aria-label="Toggle profile menu"
              >
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user.name || 'Parent'}</span>
                <FiChevronDown
                  className={`text-gray-500 transition-transform ${showProfileMenu ? 'transform rotate-180' : ''}`}
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium">{user.name || 'Parent User'}</p>
                    <p className="text-sm text-gray-500">{user.email || 'parent@school.edu'}</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiUser className="mr-2" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiSettings className="mr-2" /> Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Child's Progress</h2>
            <p className="opacity-90">Student ID: {student_id}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <FiCalendar size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Attendance Rate</h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-800">{attendanceRate}%</span>
                <div className="text-sm text-gray-500">
                  {presentDays}/{attendance.length} days
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                  <FiAward size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Current Grades</h3>
              </div>
              {gradeTrends.length > 0 && (
                <>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {Math.max(...Object.values(gradeTrends[gradeTrends.length - 1]).filter(val => typeof val === 'number'))}/100
                    </span>
                    <div className="text-sm text-gray-500">
                      Top subject
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Object.entries(gradeTrends[gradeTrends.length - 1])
                      .filter(([key]) => key !== 'week')
                      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                  <FiTrendingUp size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Grade Trend</h3>
              </div>
              {gradeTrends.length > 1 && (
                <>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {Math.round(
                        Object.values(gradeTrends[gradeTrends.length - 1])
                          .filter(val => typeof val === 'number')
                          .reduce((a, b) => a + b, 0) /
                        (Object.keys(gradeTrends[gradeTrends.length - 1]).length - 1)
                      )}/100
                    </span>
                    <div className="text-sm text-gray-500">
                      Average
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Object.values(gradeTrends[gradeTrends.length - 1])
                      .filter(val => typeof val === 'number')
                      .reduce((a, b) => a + b, 0) /
                    (Object.keys(gradeTrends[gradeTrends.length - 1]).length - 1) >
                    Object.values(gradeTrends[gradeTrends.length - 2])
                      .filter(val => typeof val === 'number')
                      .reduce((a, b) => a + b, 0) /
                    (Object.keys(gradeTrends[gradeTrends.length - 2]).length - 1)
                      ? 'Improving'
                      : 'Needs attention'}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Attendance Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiCalendar className="mr-2 text-indigo-600" />
                Attendance (Last 28 Days)
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-500">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs text-gray-500">Absent</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-gray-500">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {attendance.map((present, index) => (
                <div
                  key={index}
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    present ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={`Day ${index + 1}: ${present ? 'Present' : 'Absent'}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Grade Trends Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiTrendingUp className="mr-2 text-indigo-600" />
                Weekly Grade Trends
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-1" />
                <span>Updated weekly</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gradeTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {gradeTrends.length > 0 &&
                    Object.keys(gradeTrends[0])
                      .filter(key => key !== 'week')
                      .map((subject, i) => (
                        <Line
                          key={i}
                          type="monotone"
                          dataKey={subject}
                          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiBell className="mr-2 text-indigo-600" />
                Notifications
              </h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li key={note.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <span className={`h-2 w-2 rounded-full mt-2 ${note.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className={`text-sm ${note.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                      {note.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Today</p>
                  </div>
                  {!note.read && <span className="h-2 w-2 rounded-full bg-blue-500 mt-2"></span>}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;