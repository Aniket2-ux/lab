const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ReportItem = sequelize.define("ReportItem", {
  reportId: DataTypes.INTEGER,
  parameter: DataTypes.STRING,
  result: DataTypes.STRING,
  unit: DataTypes.STRING,
  normalRange: DataTypes.STRING,
  flag: DataTypes.STRING, // Normal / High / Low
});

module.exports = ReportItem;
