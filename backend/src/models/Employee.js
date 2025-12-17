const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define("Employee", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  pan: DataTypes.STRING,
  department: DataTypes.STRING,
  group: DataTypes.STRING,
});

module.exports = Employee;
