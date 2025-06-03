// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({ userRole, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    {
      to:
        userRole === "admin"
          ? "/admin"
          : userRole === "teacher"
          ? "/teacher"
          : "/parent",
      label: "Dashboard",
      icon: FiHome,
      roles: ["parent", "admin", "teacher"],
    },
    {
      to: "/teacher/classes",
      label: "Classes",
      icon: FiBook,
      roles: ["teacher"],
    },
    {
      to: "/teacher/attendance",
      label: "Attendance",
      icon: FiClipboard,
      roles: ["teacher"],
    },
    {
      to: "/teacher/students",
      label: "Students",
      icon: FiUsers,
      roles: ["teacher"],
    },
    { to: "/admin/users", label: "Users", icon: FiUsers, roles: ["admin"] },
    {
      to: userRole === "teacher" ? "/teacher/settings" : "/settings",
      label: "Settings",
      icon: FiSettings,
      roles: ["parent", "admin", "teacher"],
    },
    { to: "/parent/grades", label: "Grades", icon: FiBook, roles: ["parent"] },
    {
      to: "/parent/attendance",
      label: "Attendance",
      icon: FiClipboard,
      roles: ["parent"],
    },
  ];

  return (
    <div
      className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-64" : "w-20"
      } flex flex-col min-h-screen`}
    >
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">
            {userRole === "admin"
              ? "Admin Portal"
              : userRole === "teacher"
              ? "Teacher Portal"
              : "Parent Portal"}
          </h1>
        ) : (
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="font-bold">
              {userRole === "admin"
                ? "AP"
                : userRole === "teacher"
                ? "TP"
                : "PP"}
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-indigo-700"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FiMenu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems
          .filter((item) => item.roles.includes(userRole))
          .map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center p-3 rounded-lg transition ${
                location.pathname === item.to
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
              }`}
              aria-label={item.label}
            >
              <item.icon className="text-lg" />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={onLogout}
          className="flex items-center p-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:text-white transition w-full"
          aria-label="Logout"
        >
          <FiLogOut className="text-lg" />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
