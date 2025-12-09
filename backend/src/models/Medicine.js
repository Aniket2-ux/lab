// backend/src/models/Medicine.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Medicine = sequelize.define(
  "Medicine",
  {
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pcs",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "medicines",
    timestamps: true,
  }
);

module.exports = Medicine;
