'use strict';
import { Model, DataTypes } from 'sequelize';
  export default (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsTo(models.Class, { foreignKey: 'class_id' });
      Subject.belongsTo(models.User, { foreignKey: 'teacher_id' });
    }
  }

  Subject.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });

  return Subject;
};
