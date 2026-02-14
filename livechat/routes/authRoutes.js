const express = require("express");
const router = express.Router();

const { addUserAndLogin, createAnonymous } = require("../controllers/authController");

router.post("/adduser_and_login", addUserAndLogin);
router.post("/anonymous", createAnonymous);

const authRoutes = router
module.exports = authRoutes