const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Profile = sequelize.define("Profile", {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Profile;
