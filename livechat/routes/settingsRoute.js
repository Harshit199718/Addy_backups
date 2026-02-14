const express = require("express");
const { getSettings, updateSetting } = require("../controllers/settingsController");
const router = express.Router();

router.get("/", getSettings);
router.put("/update", updateSetting);

const settingsRoutes = router;
module.exports = settingsRoutes