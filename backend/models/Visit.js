const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Client = require("./Client");

const Visit = sequelize.define(
  "Visit",
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "visits",
  }
);

// 🔗 RELATION
Client.hasMany(Visit, { foreignKey: "clientId" });
Visit.belongsTo(Client, { foreignKey: "clientId" });

module.exports = Visit;