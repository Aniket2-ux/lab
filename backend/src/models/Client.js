// backend/src/models/Client.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Client = sequelize.define("Client", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  knownFrom: {
    // “Where did you hear about us”
    type: DataTypes.STRING,
    allowNull: true,          // keep NULL allowed so sync won’t break existing rows
  },
  internalNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lastVisitedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "clients",
});

module.exports = Client;
