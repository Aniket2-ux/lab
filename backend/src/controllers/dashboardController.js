const { Op } = require("sequelize");
const Bill = require("../models/Bill");

exports.getDashboardSummary = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [todayRevenueRaw, totalRevenueRaw, invoiceCount] = await Promise.all([
      Bill.sum("totalAmount", {
        where: {
          status: "finalized",
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        },
      }),
      Bill.sum("totalAmount", {
        where: { status: "finalized" },
      }),
      Bill.count({
        where: { status: "finalized" },
      }),
    ]);

    res.json({
      todayRevenue: Number(todayRevenueRaw || 0),
      totalRevenue: Number(totalRevenueRaw || 0),
      invoiceCount,
    });
  } catch (err) {
    console.error("Failed dashboard summary:", err);
    res.status(500).json({ error: "Failed dashboard summary" });
  }
};
