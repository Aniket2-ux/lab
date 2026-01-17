const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProfileTest = sequelize.define("ProfileTest", {});

module.exports = ProfileTest;
