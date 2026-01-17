const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "okhati",
  process.env.DB_PASSWORD || "okhati_pass",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // keep false for production
  }
);

module.exports = sequelize;
