const Prescription = require("../models/prescription");
const PrescriptionItem = require("../models/PrescriptionItem");

exports.createPrescription = async (req, res) => {
  try {
    const { visitId, clientId, diagnosis, notes, items = [] } = req.body;

    // Create prescription
    const prescription = await Prescription.create({
      visitId,
      clientId,
      diagnosis,
      notes,
    });

    // Create items
    const formattedItems = items.map((item) => ({
      prescriptionId: prescription.id,
      type: item.type,
      name: item.name,
      dosage: item.dosage,
      duration: item.duration,
      quantity: item.quantity,
      price: item.price,
    }));

    await PrescriptionItem.bulkCreate(formattedItems);

    res.json({ success: true, prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create prescription" });
  }
};

exports.getByVisit = async (req, res) => {
  try {
    const { visitId } = req.params;

    const prescription = await Prescription.findOne({
      where: { visitId },
      include: [PrescriptionItem],
    });

    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: "Error fetching prescription" });
  }
};