const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const LabRecord = sequelize.define(
  "LabRecord",
  {
    billId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "lab_records",   // 🔥 THIS IS THE FIX
    freezeTableName: true,
  }
);

module.exports = LabRecord;
