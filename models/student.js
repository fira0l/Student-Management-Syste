'use strict';
import { Model, DataTypes } from 'sequelize';

export default  (sequelize) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Class, { foreignKey: 'class_id' });
      Student.belongsTo(models.User, { foreignKey: 'parent_id' });
    }
  }
  Student.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
  },
{
    sequelize,
    modelName: 'Student',
  },  
  );
  return Student;
};
