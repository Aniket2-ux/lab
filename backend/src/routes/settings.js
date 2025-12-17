const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const FILE = path.join(DATA_DIR, "settings.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function read() {
  try {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return {};
  }
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

router.get("/account", (req, res) => {
  const s = read();
  res.json({
    account: s.account || { fiscalPeriods: [], vouchers: [] },
  });
});

router.post("/account", (req, res) => {
  const s = read();
  s.account = req.body.account;
  write(s);
  res.json({ ok: true, account: s.account });
});

module.exports = router;
