// backend/src/models/Service.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Service = sequelize.define(
  "Service",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    type: {
      type: DataTypes.STRING, // "labTest", "package", "consultation", ...
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "services",
  }
);

module.exports = Service;
