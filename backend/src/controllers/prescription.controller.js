const Prescription = require("../models/prescription"); // ✅ FIX CASE
const PrescriptionItem = require("../models/PrescriptionItem");

exports.createPrescription = async (req, res) => {
  const t = await Prescription.sequelize.transaction();

  try {
    const { visitId, clientId, diagnosis, notes, items = [] } = req.body;

    // ✅ VALIDATION (IMPORTANT)
    if (!visitId || !clientId) {
      return res.status(400).json({
        error: "visitId and clientId are required",
      });
    }

    // ✅ CREATE PRESCRIPTION
    const prescription = await Prescription.create(
      {
        visitId,
        clientId,
        diagnosis,
        notes,
      },
      { transaction: t }
    );

    // ✅ CREATE ITEMS (if any)
    if (items && items.length > 0) {
      const formattedItems = items.map((item) => ({
        prescriptionId: prescription.id,
        type: item.type || "medicine",
        name: item.name || "",
        dosage: item.dosage || null,
        duration: item.duration || null,
        quantity: item.quantity || null,
        price: item.price || null,
      }));

      await PrescriptionItem.bulkCreate(formattedItems, {
        transaction: t,
      });
    }

    // ✅ COMMIT
    await t.commit();

    return res.status(201).json({
      success: true,
      prescription,
    });

  } catch (error) {
    await t.rollback();

    console.error("❌ CREATE PRESCRIPTION ERROR:", error);

    return res.status(500).json({
      message: error.message,
      parent: error.parent,
      detail: error?.parent?.detail,
    });
  }
};

// =============================
// GET PRESCRIPTION BY VISIT
// =============================
exports.getByVisit = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!visitId) {
      return res.status(400).json({
        error: "visitId is required",
      });
    }

    const prescription = await Prescription.findOne({
      where: { visitId },
      include: [
        {
          model: PrescriptionItem,
        },
      ],
    });

    return res.json(prescription || null);

  } catch (error) {
    console.error("❌ FETCH PRESCRIPTION ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};