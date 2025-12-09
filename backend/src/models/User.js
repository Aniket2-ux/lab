// backend/src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Basic user table for authentication
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "staff"),
      allowNull: false,
      defaultValue: "staff",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
