// backend/src/models/Prescription.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Client = require("./Client"); // so we can relate Prescription -> Client

const Prescription = sequelize.define(
  "Prescription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // basic prescription fields – you can extend these later
    serviceProvider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    investigation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    labServices: {
      type: DataTypes.TEXT, // can store comma-separated IDs or names
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medication: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // follow-up info
    followUpDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    followUpDate: {
      type: DataTypes.DATEONLY, // YYYY-MM-DD
      allowNull: true,
    },
    followUpRemarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    followUpDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "prescriptions",
  }
);

// relations
Client.hasMany(Prescription, { foreignKey: "clientId" });
Prescription.belongsTo(Client, { foreignKey: "clientId" });

module.exports = Prescription;
