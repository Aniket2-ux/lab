const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const PROFILE_FILE = path.join(DATA_DIR, "profile.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readProfile() {
  try {
    if (!fs.existsSync(PROFILE_FILE)) return {};
    return JSON.parse(fs.readFileSync(PROFILE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeProfile(profile) {
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2), "utf8");
}

/* GET /api/settings/profile */
router.get("/profile", (req, res) => {
  res.json({ profile: readProfile() });
});

/* PUT /api/settings/profile */
router.put("/profile", (req, res) => {
  writeProfile(req.body || {});
  res.json({ ok: true, profile: req.body });
});

module.exports = router;
