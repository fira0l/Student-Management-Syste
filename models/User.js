'use strict';
import { Model, DataTypes } from 'sequelize';
// models/User.js
 // adjust path to your sequelize instance
export default (sequelize)=>{
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'parent'),
    allowNull: false
},
}, {
  timestamps: true, // adds createdAt and updatedAt
  tableName: 'Users',
});

return User;
}
