const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

/* expose sequelize */
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* =====================
   LOAD MODELS
===================== */
db.Test = require("./Test")(sequelize, Sequelize.DataTypes);
db.Profile = require("./Profile")(sequelize, Sequelize.DataTypes);
db.ProfileTest = require("./ProfileTest")(sequelize, Sequelize.DataTypes);
db.ReportTemplate = require("./ReportTemplate")(sequelize, Sequelize.DataTypes);
db.Doctor = require("./Doctor")(sequelize, Sequelize.DataTypes);

/* =====================
   RELATIONS
===================== */
db.Profile.belongsToMany(db.Test, {
  through: db.ProfileTest,
  foreignKey: "profile_id",
  otherKey: "test_id",
});

db.Test.belongsToMany(db.Profile, {
  through: db.ProfileTest,
  foreignKey: "test_id",
  otherKey: "profile_id",
});

/* =====================
   EXPORT
===================== */
module.exports = db;
