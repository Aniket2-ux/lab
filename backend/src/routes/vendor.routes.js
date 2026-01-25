const express = require("express");
const {
  Supplier,
  Referrer,
  AssociateCompany,
} = require("../models");

const router = express.Router();

/* SUPPLIER */
router.post("/suppliers", async (req, res) => {
  const data = await Supplier.create(req.body);
  res.json(data);
});
router.get("/suppliers", async (_, res) => {
  res.json(await Supplier.findAll());
});

/* REFERRER */
router.post("/referrers", async (req, res) => {
  res.json(await Referrer.create(req.body));
});
router.get("/referrers", async (_, res) => {
  res.json(await Referrer.findAll());
});

/* ASSOCIATE COMPANY */
router.post("/associate-companies", async (req, res) => {
  res.json(await AssociateCompany.create(req.body));
});
router.get("/associate-companies", async (_, res) => {
  res.json(await AssociateCompany.findAll());
});

module.exports = router;
