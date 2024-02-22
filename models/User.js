// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.INTEGER,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
