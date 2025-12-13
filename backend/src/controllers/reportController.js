// backend/src/controllers/reportController.js

// NOTE: For now we are not using any Sequelize models here.
// When we wire real reports, we'll import:
// const Client = require("../models/clients");
// const Prescription = require("../models/prescriptions");
// etc.

exports.getAppointmentReport = async (req, res, next) => {
  try {
    // TODO: replace with real DB query using Appointment model
    res.json({
      data: [],
      filters: req.query,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPrescriptionReport = async (req, res, next) => {
  try {
    // TODO: replace with real DB query using Prescription + Client + Doctor models
    res.json({
      data: [],
      filters: req.query,
    });
  } catch (err) {
    next(err);
  }
};

exports.getClientReport = async (req, res, next) => {
  try {
    // TODO: query Client model (backend/src/models/clients.js)
    res.json({
      data: [],
      filters: req.query,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRemindersReport = async (req, res, next) => {
  try {
    // TODO: use Reminder model when you create it
    res.json({
      data: [],
      filters: req.query,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProviderEfficiencyReport = async (req, res, next) => {
  try {
    // TODO: aggregate Appointment data per doctor/service provider
    res.json({
      data: [],
      filters: req.query,
    });
  } catch (err) {
    next(err);
  }
};
