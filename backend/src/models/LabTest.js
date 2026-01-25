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

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "lab_tests",
    timestamps: true,
  }
);

module.exports = LabTest;
