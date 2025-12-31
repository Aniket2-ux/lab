const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  registrationNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Doctor;
