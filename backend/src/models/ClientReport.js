const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define("ClientReport", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  doctorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  testData: {
    type: DataTypes.JSONB, // CBC / LFT / any test structure
    allowNull: false,
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ClientReport;
