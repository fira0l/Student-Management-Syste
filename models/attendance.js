// models/attendance.js
'use strict'

export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late'),
      allowNull: false
    }
  }, {
    tableName: 'attendances',
    timestamps: true
  });

  // Associations can be added here if needed later
  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, { foreignKey: 'student_id' });
    Attendance.belongsTo(models.Subject, { foreignKey: 'subject_id' });
  };

  return Attendance;
};
