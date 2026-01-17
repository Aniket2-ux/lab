const express = require("express");
const router = express.Router();
const supplierController = require("../../controllers/vendors/supplierController");

router.post("/create", supplierController.createSupplier);
router.get("/list", supplierController.getSuppliers);

module.exports = router;
