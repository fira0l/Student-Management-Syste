import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { 
  FiCalendar, FiBook, FiClipboard, FiUsers, 
  FiSettings, FiLogOut, FiMenu, FiBell, 
  FiChevronDown, FiTrendingUp, FiAward, FiUser
} from 'react-icons/fi';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function TeacherDashboard({ onLogout }) {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Parent-teacher meeting on Friday at 3 PM", color: "bg-blue-500", read: false },
    { id: 2, message: "Grades submission deadline next Monday", color: "bg-yellow-500", read: false },
    { id: 3, message: "New attendance policy updated", color: "bg-purple-500", read: true },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([dayjs().subtract(1, 'month'), dayjs()]);
  const navigate = useNavigate();
  const teacher_id = '6';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, teacherRes] = await Promise.all([
          api.get(`/api/teachers/${teacher_id}`),
          api.get(`/api/teachers/teacher/${teacher_id}`)
        ]);
        
        setClasses(classesRes.data);
        if (classesRes.data.length > 0) {
          setSelectedClass(classesRes.data[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teacher_id]);

  useEffect(() => {
    if (selectedClass) {
      fetchAttendanceData();
    }
  }, [selectedClass, dateRange]);

  async function fetchAttendanceData() {
    try {
      const res = await api.get(`/api/attendance/${selectedClass.id}`, {
        params: {
          start_date: dateRange[0].format('YYYY-MM-DD'),
          end_date: dateRange[1].format('YYYY-MM-DD')
        }
      });
      setSelectedClass(prev => ({ ...prev, trend: res.data }));
    } catch (err) {
      console.error("Error fetching attendance data:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
    navigate('/login', { replace: true });
  };

  async function openModal(cls) {
    setSelectedClass(cls);
    setModalOpen(true);
    try {
      const res = await api.get(`/api/students/${cls.id}`);
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const handleDateChange = (dates) => dates && setDateRange(dates);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"} flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-indigo-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Teacher Portal</h1>
          ) : (
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="font-bold">TP</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-indigo-700"
          >
            <FiMenu size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/teacher/dashboard" className="flex items-center p-3 rounded-lg bg-indigo-700 text-white">
            <FiClipboard className="text-lg" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link to="/teacher/classes" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiBook className="text-lg" />
            {sidebarOpen && <span className="ml-3">Classes</span>}
          </Link>
          <Link to="/teacher/attendance" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiCalendar className="text-lg" />
            {sidebarOpen && <span className="ml-3">Attendance</span>}
          </Link>
          <Link to="/teacher/students" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiUsers className="text-lg" />
            {sidebarOpen && <span className="ml-3">Students</span>}
          </Link>
          <Link to="/teacher/settings" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiSettings className="text-lg" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Teacher Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiBell className="text-gray-600" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <img 
                  src="https://i.pravatar.cc/300" 
                  alt="profile" 
                  className="w-8 h-8 rounded-full" 
                />
                {sidebarOpen && (
                  <>
                    <span className="text-gray-700 font-medium">Teacher</span>
                    <FiChevronDown className={`text-gray-500 transition-transform ${showProfileMenu ? 'transform rotate-180' : ''}`} />
                  </>
                )}
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium">Teacher User</p>
                    <p className="text-sm text-gray-500">ID: {teacher_id}</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link to="/teacher/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <FiUser className="mr-2" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/teacher/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Teaching Overview</h2>
                <p className="opacity-90">Teacher ID: {teacher_id}</p>
              </div>
              <DatePicker.RangePicker 
                value={dateRange}
                onChange={handleDateChange}
                className="border-0 bg-white/10 hover:bg-white/20"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
              />
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                <FiAward size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Best Performing Class</p>
                <p className="text-xl font-bold text-gray-800">
                  {classes.length > 0 ? 
                    [...classes].sort((a,b) => b.attendanceRate - a.attendanceRate)[0].name : 
                    'N/A'}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Attendance</p>
                <p className="text-xl font-bold text-gray-800">
                  {classes.length > 0 ? 
                    Math.round(classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length) : 
                    0}%
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-xl font-bold text-gray-800">
                  {classes.length > 0 ? 
                    classes.reduce((sum, cls) => sum + cls.totalStudents, 0) : 
                    0}
                </p>
              </div>
            </div>
          </div>

          {/* Classes Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <FiBook className="mr-2 text-indigo-600" />
              Your Classes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{cls.name}</h4>
                      <p className="text-indigo-600 font-medium">{cls.subject || 'General'}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {cls.section || 'A'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Attendance Rate</p>
                      <p className="text-2xl font-bold">{cls.attendanceRate}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${cls.attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="text-2xl font-bold">{cls.studentsPresent}/{cls.totalStudents}</p>
                    </div>
                  </div>

                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cls.trend || []}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4f8" />
                        <XAxis dataKey="day" stroke="#94a3b8" />
                        <YAxis domain={[0, 100]} stroke="#94a3b8" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => openModal(cls)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Students →
                    </button>
                    <p className="text-sm text-gray-500">
                      Next: {cls.nextAssignment || 'No assignments'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiBell className="mr-2 text-indigo-600" />
                Recent Notifications
              </h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
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
          </section>
        </main>
      </div>

      {/* Student Modal */}
      {modalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {selectedClass.name} - Student List
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-xl font-bold">{selectedClass.totalStudents}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <p className="text-xl font-bold">{selectedClass.attendanceRate}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Recent Grades</p>
                    <p className="text-xl font-bold">{selectedClass.recentGrade || 'N/A'}%</p>
                  </div>
                </div>
                
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedClass.trend || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold mb-4">Student Roster</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.length > 0 ? (
                        students.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?u=${student.id}`} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.attendance_rate >= 90 
                                  ? 'bg-green-100 text-green-800' 
                                  : student.attendance_rate >= 70 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                {student.attendance_rate || 0}%
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                            No students found in this class
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}