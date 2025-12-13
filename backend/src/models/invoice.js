const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // adjust if your sequelize instance is elsewhere

const Invoice = sequelize.define(
  "Invoice",
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
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // e.g. "draft" | "finalised"
      allowNull: false,
      defaultValue: "finalised",
    },
  },
  {
    tableName: "invoices",
    timestamps: true,
  }
);

module.exports = Invoice;
