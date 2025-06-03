import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  FiUsers,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiClipboard,
  FiBook,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiX,
  FiUser,
  FiAward,
  FiBarChart2,
  FiCheck,
  FiX as FiTimes,
} from "react-icons/fi";

export default function StudentsPage({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const teacher_id = "6"; // Replace with dynamic logic later

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await api.get(`/api/students/`);
        setStudents(res.data);

        // Initialize attendance records
        const initialRecords = {};
        res.data.forEach((student) => {
          initialRecords[student.id] = {
            status: "present", // default to present
            date: attendanceDate,
          };
        });
        setAttendanceRecords(initialRecords);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [teacher_id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status: status,
        date: attendanceDate,
      },
    }));
  };

  const handleDateChange = (e) => {
    setAttendanceDate(e.target.value);
    // Update dates in all records when the date changes
    const updatedRecords = {};
    Object.keys(attendanceRecords).forEach((studentId) => {
      updatedRecords[studentId] = {
        ...attendanceRecords[studentId],
        date: e.target.value,
      };
    });
    setAttendanceRecords(updatedRecords);
  };

  const submitAttendance = async () => {
    try {
      // Prepare data for submission
      const attendanceData = Object.keys(attendanceRecords).map(
        (student_id) => ({
          student_id: student_id,
          subject_id: "1", // Replace with actual subject ID
          status: attendanceRecords[student_id].status,
          date: attendanceRecords[student_id].date,
          teacher_id: teacher_id,
        })
      );

      // Here you would typically send this to your API
      const submitAttendance = async () => {
        try {
          // Stringify the data for debugging
          console.log(
            "Attendance data to submit:",
            JSON.stringify(attendanceData, null, 2)
          );

          // Send to API
          const response = await api.post("/api/attendance", attendanceData);

          console.log("Attendance submission successful:", response.data);
          alert("Attendance submitted successfully!");
        } catch (error) {
          console.error("Error submitting attendance:", error);
          console.error("Error details:", error.response?.data);
          alert(
            `Failed to submit attendance: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      };

      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance");
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
      {/* Sidebar - unchanged from original */}
      <div
        className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
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
          <Link
            to="/teacher/dashboard"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition"
          >
            <FiClipboard className="text-lg" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link
            to="/teacher/classes"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition"
          >
            <FiBook className="text-lg" />
            {sidebarOpen && <span className="ml-3">Classes</span>}
          </Link>
          <Link
            to="/teacher/attendance"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition"
          >
            <FiCalendar className="text-lg" />
            {sidebarOpen && <span className="ml-3">Attendance</span>}
          </Link>
          <Link
            to="/teacher/students"
            className="flex items-center p-3 rounded-lg bg-indigo-700 text-white"
          >
            <FiUsers className="text-lg" />
            {sidebarOpen && <span className="ml-3">Students</span>}
          </Link>
          <Link
            to="/teacher/settings"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 text-indigo-200 hover:text-white transition"
          >
            <FiSettings className="text-lg" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Students Management
          </h1>
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
                    <FiChevronDown
                      className={`text-gray-500 transition-transform ${
                        showProfileMenu ? "transform rotate-180" : ""
                      }`}
                    />
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
                      <Link
                        to="/teacher/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiUser className="mr-2" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacher/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
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
            <h2 className="text-xl font-semibold mb-2">Student Records</h2>
            <p className="opacity-90">
              Manage and view all student information
            </p>
          </div>

          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiUsers className="mr-2 text-indigo-600" />
                Student Directory
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={handleDateChange}
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.length > 0 ? (
                      students.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://i.pravatar.cc/150?u=${student.id}`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.first_name} {student.last_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Class {student.class_id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {student.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {attendanceRecords[student.id]?.date ||
                                attendanceDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`attendance-${student.id}`}
                                  checked={
                                    attendanceRecords[student.id]?.status ===
                                    "present"
                                  }
                                  onChange={() =>
                                    handleAttendanceChange(
                                      student.id,
                                      "present"
                                    )
                                  }
                                  className="form-radio h-4 w-4 text-green-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  Present
                                </span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`attendance-${student.id}`}
                                  checked={
                                    attendanceRecords[student.id]?.status ===
                                    "absent"
                                  }
                                  onChange={() =>
                                    handleAttendanceChange(student.id, "absent")
                                  }
                                  className="form-radio h-4 w-4 text-red-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  Absent
                                </span>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowModal(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              View
                            </button>
                            <Link
                              to="#"
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={submitAttendance}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Enhanced Student Modal - unchanged from original */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setShowModal(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiUser className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Student Details
                      </h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center mb-6">
                        <img
                          className="h-16 w-16 rounded-full mr-4"
                          src={`https://i.pravatar.cc/150?u=${selectedStudent.id}`}
                          alt="Student"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {selectedStudent.first_name}{" "}
                            {selectedStudent.last_name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ID: {selectedStudent.id}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedStudent.class_id || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedStudent.gender || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Age
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedStudent.age || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            Active
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          <FiAward className="mr-1" /> Academic Performance
                        </h4>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Average Grade
                          </span>
                          <span className="text-sm font-medium">85/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          <FiBarChart2 className="mr-1" /> Attendance
                        </h4>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Last 30 Days
                          </span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <Link
                  to={`/teacher/students/${selectedStudent.id}`}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
