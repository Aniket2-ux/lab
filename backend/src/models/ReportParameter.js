const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ReportParameter = sequelize.define("ReportParameter", {
  reportId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parameter: DataTypes.STRING,
  value: DataTypes.STRING,
  unit: DataTypes.STRING,
  normalRange: DataTypes.STRING,
  flag: DataTypes.STRING, // Normal / High / Low
});

module.exports = ReportParameter;
