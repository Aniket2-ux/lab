const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ReportTemplate = sequelize.define("ReportTemplate", {
  labName: DataTypes.STRING,
  header: DataTypes.STRING,
  footer: DataTypes.STRING,
  authorizedSignatory: DataTypes.STRING,
});

module.exports = ReportTemplate;
