const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { getBackofficeColors, updateBackofficeColors } = require("../controllers/backofficeSettingsController");
const router = express.Router();

router.get("/", verifyToken, getBackofficeColors);
router.put("/update", verifyToken, updateBackofficeColors);

const backofficeSettingsRoutes = router;
module.exports = backofficeSettingsRoutes