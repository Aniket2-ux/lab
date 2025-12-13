const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Bill = require("./Bill");

const LabRecord = sequelize.define("LabRecord", {
  billId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Ordered",
  },
});

Bill.hasOne(LabRecord, { foreignKey: "billId" });
LabRecord.belongsTo(Bill, { foreignKey: "billId" });

module.exports = LabRecord;
