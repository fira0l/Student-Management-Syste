// models/StudentSubject.js
export default (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
  return StudentSubject;
};