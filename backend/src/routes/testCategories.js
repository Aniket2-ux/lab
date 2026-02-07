const router = require("express").Router();
const db = require("../models");
const db = require("../models");


/* GET ALL */
router.get("/", async (_req, res) => {
  const data = await TestCategory.findAll({
    order: [["name", "ASC"]],
  });
  res.json(data);
});

/* CREATE */
router.post("/", async (req, res) => {
  const { name } = req.body;
  const item = await TestCategory.create({ name });
  res.json(item);
});

module.exports = router;
