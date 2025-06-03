import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../api/axios";
import { 
  FiUsers, FiBell, FiChevronDown, FiMenu, 
  FiClipboard, FiBook, FiCalendar, 
  FiSettings, FiLogOut, FiCheckCircle, 
  FiXCircle, FiTrendingUp, FiFilter
} from 'react-icons/fi';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function AttendancePage({ onLogout }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([dayjs().subtract(1, 'month'), dayjs()]);
  const [stats, setStats] = useState({ present: 0, absent: 0, rate: 0 });
  const teacher_id = '6';

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await api.get(`/api/teachers/${teacher_id}`);
        setClasses(res.data);
        if (res.data.length > 0) {
          setSelectedClass(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, [teacher_id]);

  useEffect(() => {
    if (selectedClass) {
      async function fetchAttendance() {
        try {
          const res = await api.get(`/api/attendance/`, {
            params: {
              class_id: selectedClass.id,
              start_date: dateRange[0].format('YYYY-MM-DD'),
              end_date: dateRange[1].format('YYYY-MM-DD')
            }
          });
          setAttendanceData(res.data);
          
          // Calculate stats
          const present = res.data.filter(r => r.present).length;
          const absent = res.data.filter(r => !r.present).length;
          const rate = Math.round((present / res.data.length) * 100) || 0;
          setStats({ present, absent, rate });
        } catch (err) {
          console.error("Error fetching attendance:", err);
        }
      }
      fetchAttendance();
    }
  }, [selectedClass, dateRange]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

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
          <Link to="/teacher/dashboard" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiClipboard className="text-lg" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link to="/teacher/classes" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiBook className="text-lg" />
            {sidebarOpen && <span className="ml-3">Classes</span>}
          </Link>
          <Link to="/teacher/attendance" className="flex items-center p-3 rounded-lg bg-indigo-700 text-white">
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
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Attendance Management</h1>
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
                    <p className="text-sm text-gray-500">teacher@school.edu</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link to="/teacher/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <FiUsers className="mr-2" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/teacher/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <FiSettings className="mr-2" /> Settings
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={onLogout}
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
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-2">Attendance Tracking</h2>
            <p className="opacity-90">View and manage student attendance records</p>
          </div>

          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4 md:mb-0">
                <FiCalendar className="mr-2 text-indigo-600" />
                Class Attendance
              </h3>
              
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Class:</label>
                  <select
                    value={selectedClass?.id || ""}
                    onChange={(e) => setSelectedClass(classes.find(cls => cls.id === e.target.value))}
                    className="w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range:</label>
                  <DatePicker.RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    className="w-full"
                    format="MMM D, YYYY"
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                    <FiCheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Present</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.present}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-red-100 text-red-600 mr-4">
                    <FiXCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Absent</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.absent}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                    <FiTrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.rate}%</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${stats.rate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Calendar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold">
                  {selectedClass?.name} - {dateRange[0].format('MMM D')} to {dateRange[1].format('MMM D, YYYY')}
                </h4>
                <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                  <FiFilter className="mr-1" /> Filter
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 mb-4 min-w-max">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium text-gray-500 w-12">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 min-w-max">
                  {attendanceData.map((record, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs ${
                        record.present 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                      title={`${dayjs(record.date).format('MMM D, YYYY')}: ${record.present ? 'Present' : 'Absent'}`}
                    >
                      <span className="font-medium">{dayjs(record.date).format('D')}</span>
                      {record.present ? (
                        <FiCheckCircle className="text-green-500 mt-1" size={14} />
                      ) : (
                        <FiXCircle className="text-red-500 mt-1" size={14} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Attendance Table */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
              <h4 className="text-lg font-semibold mb-4">Detailed Records</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dayjs(record.date).format('MMM D, YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dayjs(record.date).format('ddd')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.present 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {record.present ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {record.notes || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}