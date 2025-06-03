import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Class extends Model {
    static associate(models) {
      // Define associations here
      Class.hasMany(models.Student, { foreignKey: 'classId' });
    }
  }

  Class.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );

  return Class;
};
