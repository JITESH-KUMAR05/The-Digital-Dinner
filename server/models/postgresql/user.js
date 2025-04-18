const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');  // Make sure to destructure sequelize

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,  // This needs to be the sequelize instance from db.js
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

module.exports = User;