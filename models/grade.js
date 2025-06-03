// models/grade.js
export default (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    grade_type: {
      type: DataTypes.ENUM('test', 'assignment', 'final'),
      allowNull: false,
    },
  }, {
    tableName: 'grades',
    timestamps: true,
  });

  // Define associations
  Grade.associate = (models) => {
    Grade.belongsTo(models.Student, { foreignKey: 'student_id' });
    Grade.belongsTo(models.Subject, { foreignKey: 'subject_id' });
  };

  return Grade;
};
