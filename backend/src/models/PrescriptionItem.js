const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const PrescriptionItem = sequelize.define(
  "PrescriptionItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    prescriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING, // medicine / service
      allowNull: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dosage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "prescription_items",
  }
);

module.exports = PrescriptionItem;