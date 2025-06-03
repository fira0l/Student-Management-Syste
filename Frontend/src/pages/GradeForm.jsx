import React, { useState } from 'react';

const mockStudents = [
  { id: 1, name: 'Student One' },
  { id: 2, name: 'Student Two' },
  { id: 3, name: 'Student Three' }
];

const GradeForm = () => {
  const [grades, setGrades] = useState({});

  const handleChange = (id, grade) => {
    setGrades({ ...grades, [id]: grade });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted grades:', grades);
    alert('Grades submitted successfully!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enter Grades</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mockStudents.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <span className="w-40">{student.name}</span>
            <input
              type="number"
              min="0"
              max="100"
              className="p-2 border rounded"
              onChange={(e) => handleChange(student.id, e.target.value)}
            />
          </div>
        ))}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Submit Grades
        </button>
      </form>
    </div>
  );
};

export default GradeForm;