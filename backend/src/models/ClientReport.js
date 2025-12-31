const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define("ClientReport", {
  reportCode: { type: DataTypes.STRING, unique: true },
  patientName: DataTypes.STRING,
  age: DataTypes.STRING,
  gender: DataTypes.STRING,
  doctorName: DataTypes.STRING,
  testName: DataTypes.STRING,
  sampleDate: DataTypes.DATE,
  reportDate: DataTypes.DATE,
  passwordHash: DataTypes.STRING,
});

module.exports = ClientReport;
