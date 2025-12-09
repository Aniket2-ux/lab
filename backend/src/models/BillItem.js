// backend/src/models/BillItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Bill = require("./Bill");

const BillItem = sequelize.define("BillItem", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dept: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
});

// simple association
Bill.hasMany(BillItem, { as: "items", foreignKey: "billId" });
BillItem.belongsTo(Bill, { foreignKey: "billId" });

module.exports = BillItem;
