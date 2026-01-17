const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TestCategory = sequelize.define("TestCategory", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = TestCategory;
