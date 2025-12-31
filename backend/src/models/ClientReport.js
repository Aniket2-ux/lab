const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define("ClientReport", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  reportCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.STRING, // ✅ STRING (VERY IMPORTANT)
    allowNull: false,
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  doctorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tests: {
    type: DataTypes.JSONB, // ✅ stores full report structure
    allowNull: false,
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ClientReport;
