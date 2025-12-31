const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define("ClientReport", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  clientId: DataTypes.STRING,
  patientName: DataTypes.STRING,
  age: DataTypes.INTEGER,
  gender: DataTypes.STRING,

  doctorId: DataTypes.INTEGER,

  passwordHash: DataTypes.STRING,

  tests: {
    type: DataTypes.JSONB, // REAL STRUCTURE
    allowNull: false,
  },
});

module.exports = ClientReport;
