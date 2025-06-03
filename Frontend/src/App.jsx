// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import AdminUsers from "./pages/AdminUsers";
import ClassesPage from "./pages/ClassesPage";
import AttendancePage from "./pages/AttendancePage";
import StudentsPage from "./pages/StudentPage";
import SettingsPage from "./pages/SettingsPage";

// Utility function to get user role from localStorage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || null;
};

function RequireAuth({ children, allowedRoles }) {
  const role = getUserRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const navigate = useNavigate();

  const handleLogin = (role, userData = {}) => {
    console.log(`Logged in as ${role}`);
    localStorage.setItem("user", JSON.stringify({ role, ...userData }));
    // Redirect based on role
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "parent":
        navigate("/parent");
        break;
      default:
        navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/grades"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminUsers onLogout={handleLogout} />
            </RequireAuth>
          }
        />

        <Route
          path="/teacher"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <TeacherDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <TeacherDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <ClassesPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/classes/:class_id"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <ClassesPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <AttendancePage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <StudentsPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/students/:class_id"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <StudentsPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/settings"
          element={
            <RequireAuth allowedRoles={["teacher"]}>
              <SettingsPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />

        <Route
          path="/parent"
          element={
            <RequireAuth allowedRoles={["parent"]}>
              <ParentDashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth allowedRoles={["parent", "admin"]}>
              <SettingsPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth allowedRoles={["parent", "admin", "teacher"]}>
              <div className="p-6">Profile Page (Placeholder)</div>
            </RequireAuth>
          }
        />
        <Route
          path="/parent/grades"
          element={
            <RequireAuth allowedRoles={["parent"]}>
              <div className="p-6">Grades Page (Placeholder)</div>
            </RequireAuth>
          }
        />
        <Route
          path="/parent/attendance"
          element={
            <RequireAuth allowedRoles={["parent"]}>
              <div className="p-6">Attendance Page (Placeholder)</div>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
