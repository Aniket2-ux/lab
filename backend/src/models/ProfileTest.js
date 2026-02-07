module.exports = (sequelize, DataTypes) => {
  const ProfileTest = sequelize.define(
    "ProfileTest",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "profile_tests",
      timestamps: false,
    }
  );

  return ProfileTest;
};
