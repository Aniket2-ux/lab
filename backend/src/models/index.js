const ClientReport = require("./ClientReport");
const ReportItem = require("./ReportItem");

ClientReport.hasMany(ReportItem, { foreignKey: "reportId" });
ReportItem.belongsTo(ClientReport, { foreignKey: "reportId" });
