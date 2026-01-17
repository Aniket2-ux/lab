const LabTest = require("./LabTest");
const TestParameter = require("./TestParameter");
const ClientReport = require("./ClientReport");
const ReportItem = require("./ReportItem");

/* Test → Parameters */
LabTest.hasMany(TestParameter, {
  foreignKey: "labTestId",
  onDelete: "CASCADE",
});
TestParameter.belongsTo(LabTest, {
  foreignKey: "labTestId",
});

/* Report → Items */
ClientReport.hasMany(ReportItem, {
  foreignKey: "reportId",
  onDelete: "CASCADE",
});
ReportItem.belongsTo(ClientReport, {
  foreignKey: "reportId",
});

module.exports = {
  LabTest,
  TestParameter,
  ClientReport,
  ReportItem,
};
