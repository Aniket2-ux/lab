const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

module.exports = router;
