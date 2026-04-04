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
      type: DataTypes.ENUM("medicine", "service"),
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
    },

    dosage: {
      type: DataTypes.STRING,
    },

    duration: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.INTEGER,
    },

    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "prescription_items",
  }
);

module.exports = PrescriptionItem;