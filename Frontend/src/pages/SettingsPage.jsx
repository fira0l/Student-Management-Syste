import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import { FiSettings, FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import { FiUsers, FiBell, FiChevronDown, FiMenu, FiClipboard, FiBook, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';

export default function SettingsPage({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "Teacher User",
    email: "teacher@school.edu",
    password: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated! (Placeholder)");
    // TODO: POST to backend
  };

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
          <Link to="/teacher/attendance" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiCalendar className="text-lg" />
            {sidebarOpen && <span className="ml-3">Attendance</span>}
          </Link>
          <Link to="/teacher/students" className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition">
            <FiUsers className="text-lg" />
            {sidebarOpen && <span className="ml-3">Students</span>}
          </Link>
          <Link to="/teacher/settings" className="flex items-center p-3 rounded-lg bg-indigo-700 text-white">
            <FiSettings className="text-lg" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
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
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <p className="opacity-90">Manage your profile and preferences</p>
          </div>

          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <FiSettings className="mr-2 text-indigo-600" />
              Profile Settings
            </h3>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter new password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-lg font-bold shadow-md shadow-blue-400/40 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}