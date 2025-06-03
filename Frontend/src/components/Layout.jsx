import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">SchoolSys</h1>
        <nav className="space-y-2">
          <Link to="/admin" className="block text-gray-700 hover:text-blue-500">Admin Dashboard</Link>
          <Link to="/teacher" className="block text-gray-700 hover:text-blue-500">Teacher Dashboard</Link>
          <Link to="/parent" className="block text-gray-700 hover:text-blue-500">Parent Dashboard</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-end">
          <div className="text-gray-600">Welcome, User</div>
        </header>
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
