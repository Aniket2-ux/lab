const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Doctor = sequelize.define("Doctor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qualification: {
    type: DataTypes.STRING,
  },
});

module.exports = Doctor;
