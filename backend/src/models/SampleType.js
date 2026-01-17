const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SampleType = sequelize.define("SampleType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = SampleType;
