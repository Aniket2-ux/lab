const ClientReport = require("./ClientReport");
const ReportParameter = require("./ReportParameter");

ClientReport.hasMany(ReportParameter, { foreignKey: "reportId" });
ReportParameter.belongsTo(ClientReport, { foreignKey: "reportId" });
