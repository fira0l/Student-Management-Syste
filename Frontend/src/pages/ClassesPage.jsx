import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../api/axios";
import { 
  FiUsers, FiBell, FiChevronDown, FiMenu, 
  FiClipboard, FiBook, FiCalendar, 
  FiSettings, FiLogOut, FiPlus, 
  FiSearch, FiBarChart2, FiUser
} from 'react-icons/fi';

export default function ClassesPage({ onLogout }) {
  const [classes, setClasses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const teacher_id = '6';

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await api.get(`/api/teachers/${teacher_id}`);
        setClasses(res.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, [teacher_id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Link to="/teacher/classes" className="flex items-center p-3 rounded-lg bg-indigo-700 text-white">
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
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Class Management</h1>
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
                        <FiUser className="mr-2" /> My Profile
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Teaching Classes</h2>
                <p className="opacity-90">Teacher ID: {teacher_id}</p>
              </div>
              <Link 
                to="/teacher/classes/new" 
                className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                <FiPlus className="mr-2" /> Add Class
              </Link>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4 md:mb-0">
                <FiBook className="mr-2 text-indigo-600" />
                All Classes
              </h3>
              
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredClasses.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <p className="text-gray-500">No classes found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{cls.name}</h4>
                          <p className="text-sm text-indigo-600 font-medium">{cls.subject || "General"}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {cls.section || "A"}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiUsers className="mr-2" />
                          <span>{cls.totalStudents || 0} students</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiBarChart2 className="mr-2" />
                          <span>Avg. Grade: {cls.recentGrade || "N/A"}%</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2" />
                          <span>Schedule: {cls.schedule || "Mon/Wed/Fri"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                      <Link 
                        to={`/teacher/classes/${cls.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View Details →
                      </Link>
                      <div className="text-xs text-gray-500">
                        Last updated: {cls.lastUpdated || "Today"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}