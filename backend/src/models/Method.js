const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Method = sequelize.define("Method", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Method;
