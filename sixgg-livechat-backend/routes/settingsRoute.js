const express = require("express");
const { getSettings, updateSetting } = require("../controllers/settingsController");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

router.get("/", verifyToken, getSettings);
router.put("/update", verifyToken, updateSetting);

const settingsRoutes = router;
module.exports = settingsRoutes