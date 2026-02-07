db.Profile = require("./Profile")(sequelize, Sequelize.DataTypes);
db.ProfileTest = require("./ProfileTest")(sequelize, Sequelize.DataTypes);
db.ReportTemplate = require("./ReportTemplate")(sequelize, Sequelize.DataTypes);
db.Doctor = require("./Doctor")(sequelize, Sequelize.DataTypes);


/* relations */
db.Profile.belongsToMany(db.Test, {
  through: db.ProfileTest,
  foreignKey: "profile_id",
});

db.Test.belongsToMany(db.Profile, {
  through: db.ProfileTest,
  foreignKey: "test_id",
});
