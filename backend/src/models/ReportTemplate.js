module.exports = (sequelize, DataTypes) => {
  const ReportTemplate = sequelize.define("ReportTemplate", {
    labName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headerText: {
      type: DataTypes.TEXT,
    },
    footerText: {
      type: DataTypes.TEXT,
    },
    authorizedSignatory: {
      type: DataTypes.STRING,
    },
  });

  return ReportTemplate;
};
