const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { createDepartment, getDepartments } = require("../controllers/departmentController");
const router = express.Router();


router.post("/create", verifyToken, createDepartment);
router.get("/all", verifyToken, getDepartments);

const departmentRoutes = router;
module.exports = departmentRoutes