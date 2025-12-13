const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BillItem = sequelize.define(
  "BillItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    billId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

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
      defaultValue: "pcs",
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
  },
  {
    tableName: "bill_items",
    timestamps: true,
  }
);

/**
 * 🔗 Associations (called from model loader)
 */
BillItem.associate = (models) => {
  BillItem.belongsTo(models.Bill, {
    foreignKey: "billId",
    as: "bill",
  });
};

module.exports = BillItem;
