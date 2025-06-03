// import React from "react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const attendanceData = [
//   { day: "Mon", rate: 90 },
//   { day: "Tue", rate: 92 },
//   { day: "Wed", rate: 88 },
//   { day: "Thu", rate: 94 },
//   { day: "Fri", rate: 91 },
// ];

// // src/pages/AdminDashboard.jsx
// export default function AdminDashboard() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="text-gray-500 text-sm">Total Students</h3>
//           <p className="text-2xl font-semibold text-blue-600">512</p>
//         </div>
//         {/* Attendance Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow mb-8">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             Weekly Attendance Rate
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={attendanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis domain={[80, 100]} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="rate"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="text-gray-500 text-sm">Total Teachers</h3>
//           <p className="text-2xl font-semibold text-green-600">38</p>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={attendanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis domain={[80, 100]} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="rate"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="text-gray-500 text-sm">Attendance Rate</h3>
//           <p className="text-2xl font-semibold text-yellow-500">92%</p>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={attendanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis domain={[80, 100]} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="rate"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="text-gray-500 text-sm">Average Grade</h3>
//           <p className="text-2xl font-semibold text-purple-600">B+</p>
//         </div>
//       </div>

//       {/* Add more sections here later like recent activity or quick links */}
//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow transition">
//           Add New Teacher
//         </button>
//         <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-medium shadow transition">
//           Generate Attendance Report
//         </button>
//         <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-medium shadow transition">
//           View Grade Summary
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import api from "../api/axios"; // Adjust the import based on your API setup

// export default function AdminDashboard({ onLogout }) {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // const [attendanceData, setAttendanceData] = useState([]);
//   // const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0 });
//   // const [notifications, setNotifications] = useState([]);
//   // const [recentActivity, setRecentActivity] = useState([]);

//   const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

//   // Fetch dashboard data

//   const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0 });
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsRes, attendanceRes, notificationsRes, activityRes] =
//           await Promise.all([
//             api.get("/api/admin/stats"),
//             api.get("/api/attendance"),
//             // api.get("/api/admin/notifications"),
//             // api.get("/api/admin/activity"),
//           ]);

//           console.log("Stats:", statsRes.data);
//           console.log("Attendance Data:", attendanceRes.data);  

//         setStats(statsRes.data);
//         setAttendanceData(attendanceRes.data);
//         // setNotifications(notificationsRes.data);
//         // setRecentActivity(activityRes.data);
//       } catch (err) {
//         console.error("Failed to fetch dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, []);
//   // const onLogout = () => {
//   //   // Handle logout logic here
//   //   console.log("Logging out...");
//   //   // Redirect to login page or perform other actions
//   // };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} p-4`}>
//         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 text-gray-500 hover:text-indigo-600">
//           {sidebarOpen ? "⬅️" : "➡️"}
//         </button>
//         <ul className="space-y-4 text-gray-700">
//           <li className="hover:text-indigo-600 cursor-pointer">🏠 {sidebarOpen && "Dashboard"}</li>
//           <li className="hover:text-indigo-600 cursor-pointer">📚 {sidebarOpen && "Manage Grades"}</li>
//           <li className="hover:text-indigo-600 cursor-pointer">📋 {sidebarOpen && "Attendance"}</li>
//           <li className="hover:text-indigo-600 cursor-pointer">👥 {sidebarOpen && "Users"}</li>
//         </ul>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6 bg-gray-100">
//         <div className="min-h-screen bg-gray-100 p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//             <div className="relative">
//               <button onClick={toggleProfileMenu} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition">
//                 <img src="https://i.pravatar.cc/300" alt="profile" className="w-8 h-8 rounded-full" />
//                 <span className="text-gray-700 font-medium">Admin</span>
//               </button>
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
//                   <ul className="divide-y text-sm text-gray-700">
//                     <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100">My Profile</button></li>
//                     <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button></li>
//                     <li>
//                       <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Welcome Banner */}
//           <div className="bg-white p-6 rounded-2xl shadow mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome Back, Admin!</h2>
//             <p className="text-gray-500">Here's a quick overview of today's performance.</p>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//               <h3 className="text-sm text-gray-500">Students</h3>
//               <p className="text-2xl font-bold text-indigo-600">{stats.students}</p>
//             </div>
//             <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//               <h3 className="text-sm text-gray-500">Teachers</h3>
//               <p className="text-2xl font-bold text-green-600">{stats.teachers}</p>
//             </div>
//             <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//               <h3 className="text-sm text-gray-500">Classes</h3>
//               <p className="text-2xl font-bold text-yellow-600">{stats.classes}</p>
//             </div>
//           </div>

//           {/* Attendance Chart */}
//           <div className="bg-white p-6 rounded-2xl shadow">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Attendance</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={attendanceData}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="attendance" fill="#6366f1" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Notifications */}
//           <div className="bg-white p-6 rounded-2xl shadow mt-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Notifications</h2>
//             <ul className="space-y-4">
//               {notifications.map((note, index) => (
//                 <li key={index} className="flex items-start gap-3">
//                   <span className={`h-3 w-3 rounded-full mt-2 ${note.color}`} />
//                   <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: note.message }} />
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white p-6 rounded-2xl shadow mt-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left">
//                 <thead className="text-gray-500 uppercase border-b">
//                   <tr>
//                     <th className="py-2 px-4">User</th>
//                     <th className="py-2 px-4">Activity</th>
//                     <th className="py-2 px-4">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                   {recentActivity.map((act, i) => (
//                     <tr key={i} className="border-b hover:bg-gray-50">
//                       <td className="py-2 px-4">{act.user}</td>
//                       <td className="py-2 px-4">{act.action}</td>
//                       <td className="py-2 px-4">{act.time}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";
import { 
  FiHome, FiBook, FiClipboard, FiUsers, 
  FiSettings, FiLogOut, FiMenu, FiBell, 
  FiUser, FiChevronDown, FiCalendar, 
  FiTrendingUp, FiPieChart
} from "react-icons/fi";
import api from "../api/axios";

export default function AdminDashboard({ onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0 });
  const [attendanceData, setAttendanceData] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "3 new students registered today", color: "bg-blue-500", read: false },
    { id: 2, message: "Math class attendance is below average", color: "bg-yellow-500", read: false },
    { id: 3, message: "System maintenance scheduled for Friday", color: "bg-purple-500", read: true }
  ]);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "Sarah Johnson", action: "Updated grade for Math 101", time: "2 mins ago" },
    { id: 2, user: "Michael Chen", action: "Added new assignment", time: "15 mins ago" },
    { id: 3, user: "Admin", action: "Approved teacher registration", time: "1 hour ago" },
    { id: 4, user: "System", action: "Completed nightly backup", time: "3 hours ago" }
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, attendanceRes] = await Promise.all([
          api.get("/api/admin/stats"),
          api.get("/api/attendance"),
        ]);

        setStats(statsRes.data);
        setAttendanceData(attendanceRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const gradeTrendData = [
    { month: 'Jan', math: 75, science: 82, english: 78 },
    { month: 'Feb', math: 78, science: 84, english: 80 },
    { month: 'Mar', math: 82, science: 86, english: 83 },
    { month: 'Apr', math: 85, science: 88, english: 85 },
    { month: 'May', math: 88, science: 90, english: 87 },
  ];

  const navItems = [
    { to: "/admin/dashboard", icon: FiHome, label: "Dashboard" },
    { to: "/admin/grades", icon: FiBook, label: "Manage Grades" },
    { to: "/admin/attendance", icon: FiClipboard, label: "Attendance" },
    { to: "/admin/users", icon: FiUsers, label: "Users" },
    { to: "/admin/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-16"} flex flex-col shadow-2xl`}>
        <div className="p-4 flex items-center justify-between border-b border-indigo-700/50">
          {sidebarOpen ? (
            <h1 className="text-2xl font-extrabold tracking-tight">EduAdmin</h1>
          ) : (
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">EA</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-indigo-700/50 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center p-3 rounded-xl hover:bg-indigo-700/50 text-indigo-100 hover:text-white transition-colors group relative"
            >
              <item.icon className="text-xl" />
              {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
              {!sidebarOpen && (
                <span className="absolute left-16 bg-indigo-900 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="p-3 border-t border-indigo-700/50">
          <button 
            onClick={handleLogout}
            className="flex items-center p-3 rounded-xl hover:bg-red-600/50 text-indigo-100 hover:text-white transition-colors w-full group relative"
          >
            <FiLogOut className="text-xl" />
            {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
            {!sidebarOpen && (
              <span className="absolute left-16 bg-indigo-900 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative group" aria-label="Notifications">
              <FiBell className="text-gray-600" size={22} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-xl transition-colors"
                aria-label="Profile menu"
              >
                <img 
                  src="https://i.pravatar.cc/300" 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full border-2 border-indigo-100" 
                />
                <span className="text-gray-800 font-semibold hidden sm:inline">Admin</span>
                <FiChevronDown className={`text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl z-50 border border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">Admin User</p>
                    <p className="text-sm text-gray-500">admin@school.edu</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link to="/admin/profile" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-indigo-50 transition-colors">
                        <FiUser className="mr-2 text-indigo-600" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/settings" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-indigo-50 transition-colors">
                        <FiSettings className="mr-2 text-indigo-600" /> Settings
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
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

        <main className="p-6 flex-1">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-2">Welcome Back, Admin!</h2>
            <p className="text-indigo-100">Here's what's happening with your school today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.students}</p>
                {/* <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p> */}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center">
              <div className="p-3 rounded-xl bg-green-100 text-green-600 mr-4">
                <FiUser size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.teachers}</p>
                {/* <p className="text-xs text-blue-600 mt-1">3 new this month</p> */}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600 mr-4">
                <FiBook size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.classes}</p>
                {/* <p className="text-xs text-gray-500 mt-1">5 more than last term</p> */}
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Attendance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  Monthly Attendance
                </h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grade Trends Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiTrendingUp className="mr-2 text-indigo-600" />
                  Grade Trends
                </h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>All Subjects</option>
                  <option>Math</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gradeTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="math" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="english" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiBell className="mr-2 text-indigo-600" />
                  Notifications
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
              </div>
              <ul className="space-y-3">
                {notifications.map((note) => (
                  <li key={note.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <span className={`h-2.5 w-2.5 rounded-full mt-2 ${note.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className={`text-sm ${note.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                        {note.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Today</p>
                    </div>
                    {!note.read && <span className="h-2.5 w-2.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiPieChart className="mr-2 text-indigo-600" />
                  Recent Activity
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentActivity.map((act) => (
                      <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3.5 text-sm font-medium text-gray-900">{act.user}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-600">{act.action}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-500">{act.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}