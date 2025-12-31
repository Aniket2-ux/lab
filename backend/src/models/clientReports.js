const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ClientReport = sequelize.define(
  "ClientReport",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    /* Link report to client */
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    reportCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pdfPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /* bcrypt hash of password */
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "client_reports",
    timestamps: true,
  }
);

module.exports = ClientReport;
