const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TestParameter = sequelize.define(
  "TestParameter",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    normalRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "test_parameters",
    timestamps: true,
  }
);

module.exports = TestParameter;
