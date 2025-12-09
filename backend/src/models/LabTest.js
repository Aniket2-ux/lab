// backend/src/models/LabTest.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const LabTest = sequelize.define(
  "LabTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    testCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orderedOn: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ordered",
    },

    // ✅ allow null / empty string so old rows don't break
    tat: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    tableName: "lab_tests",
  }
);

module.exports = LabTest;
