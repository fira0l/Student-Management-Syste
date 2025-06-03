// src/pages/AdminUsers.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  FiUser, FiMail, FiLock, FiX, FiPlus,
  FiSearch, FiEdit2, FiTrash2, FiEye
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import FocusTrap from 'focus-trap-react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';

const AdminUsers = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('teachers');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'admin';

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name || formData.name.length < 2) {
      errors.name = 'Name is required and must be at least 2 characters';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!editUserId && (!formData.password || formData.password.length < 6)) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch users with pagination
  const fetchUsers = async (role) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/users?role=${role}&page=${page}&limit=10`);
      const users = Array.isArray(response.data) ? response.data : [];
      role === 'teacher' ? setTeachers(users) : setStudents(users);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch users.');
      role === 'teacher' ? setTeachers([]) : setStudents([]);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(activeTab === 'teachers' ? 'teacher' : 'student');
  }, [activeTab, page]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password || undefined,
      role: activeTab === 'teachers' ? 'teacher' : 'student',
    };

    try {
      if (editUserId) {
        const response = await api.put(`/api/users/${editUserId}`, userData);
        const updatedUser = response.data;
        if (userData.role === 'teacher') {
          setTeachers(teachers.map(u => u.id === editUserId ? updatedUser : u));
        } else {
          setStudents(students.map(u => u.id === editUserId ? updatedUser : u));
        }
        toast.success('User updated successfully!');
      } else {
        const response = await api.post('/api/users/register', userData);
        const createdUser = response.data;
        if (userData.role === 'teacher') {
          setTeachers((prev) => [...prev, createdUser]);
        } else {
          setStudents((prev) => [...prev, createdUser]);
        }
        toast.success('User added successfully!');
      }
      setFormData({ name: '', email: '', password: '' });
      setEditUserId(null);
      setFormErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save user:', error);
      toast.error(error.response?.data?.message || 'Failed to save user.');
    }
  };

  const handleDeleteUser = async (userId, role) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/api/users/${userId}`);
      if (role === 'teacher') {
        setTeachers(teachers.filter(teacher => teacher.id !== userId));
      } else {
        setStudents(students.filter(student => student.id !== userId));
      }
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user.');
    }
  };

  const handleEditUser = (user) => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setEditUserId(user.id);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
    navigate('/login', { replace: true });
  };

  const dataToDisplay = activeTab === 'teachers' ? teachers : students;
  const filteredData = Array.isArray(dataToDisplay) ? dataToDisplay.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole={userRole} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <Button
            onClick={() => {
              setFormData({ name: '', email: '', password: '' });
              setEditUserId(null);
              setFormErrors({});
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2"
            aria-label="Add new user"
          >
            <FiPlus size={18} />
            Add User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'teachers' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('teachers')}
              aria-label="View teachers"
            >
              Teachers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'students' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('students')}
              aria-label="View students"
            >
              Students
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'teachers' ? 'teachers...' : 'students...'}`}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={`Search ${activeTab}`}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table role="grid" aria-label="User management table" className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user.status || 'active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            aria-label={`View ${user.name}`}
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleEditUser(user)}
                            aria-label={`Edit ${user.name}`}
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteUser(user.id, user.role)}
                            aria-label={`Delete ${user.name}`}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        No {activeTab} found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              aria-label="Previous page"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              aria-label="Next page"
            >
              Next
            </Button>
          </div>
        )}

        {isModalOpen && (
          <FocusTrap>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editUserId ? 'Edit' : 'Add New'} {activeTab === 'teachers' ? 'Teacher' : 'Student'}
                  </h2>
                  <button
                    onClick={() => {
                      setFormData({ name: '', email: '', password: '' });
                      setEditUserId(null);
                      setFormErrors({});
                      setIsModalOpen(false);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Close modal"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddOrUpdateUser} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        aria-invalid={formErrors.name ? 'true' : 'false'}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        aria-invalid={formErrors.email ? 'true' : 'false'}
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        aria-invalid={formErrors.password ? 'true' : 'false'}
                      />
                      {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      value={activeTab === 'teachers' ? 'Teacher' : 'Student'}
                      disabled
                      aria-label="User role"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({ name: '', email: '', password: '' });
                        setEditUserId(null);
                        setFormErrors({});
                        setIsModalOpen(false);
                      }}
                      aria-label="Cancel"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" aria-label={editUserId ? 'Update user' : 'Add user'}>
                      {editUserId ? 'Update' : 'Add'} User
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </FocusTrap>
        )}
      </div>
    </div>
  );
};

export default AdminUsers