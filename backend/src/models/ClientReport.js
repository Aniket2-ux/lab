const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define("ClientReport", {
  reportCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ClientReport;
