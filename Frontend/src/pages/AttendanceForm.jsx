import React, { useState } from 'react';

const mockStudents = [
  { id: 1, name: 'Student One' },
  { id: 2, name: 'Student Two' },
  { id: 3, name: 'Student Three' }
];

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({});

  const handleChange = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted attendance:', attendance);
    alert('Attendance submitted successfully!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Take Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mockStudents.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <span className="w-40">{student.name}</span>
            <select
              onChange={(e) => handleChange(student.id, e.target.value)}
              className="p-2 border rounded"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        ))}
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;