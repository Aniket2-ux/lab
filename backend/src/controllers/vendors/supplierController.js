const db = require("../../models");
const Supplier = db.Supplier;

exports.createSupplier = async (req, res) => {
  try {
    const data = await Supplier.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const data = await Supplier.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
