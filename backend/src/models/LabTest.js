const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const LabTest = sequelize.define(
  "LabTest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    normalRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "lab_tests",
    timestamps: true,
  }
);

module.exports = LabTest;
