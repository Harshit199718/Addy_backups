const express = require("express");
const router = express.Router();

const { updateUserDepartment, getUserDetails, getUsers, blockUser, addUserToDepartment, changeUserDepartment, getAgentsWithDepartment, createUser } = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

router.post("/create_user", verifyToken, createUser);
router.put("/update_department", updateUserDepartment);
router.get("/profile", verifyToken, getUserDetails);
router.get("/all", verifyToken, getUsers);
router.get("/agents/:department", verifyToken, getAgentsWithDepartment);
router.put("/user/block", verifyToken, blockUser);
router.put("/add_to_department", verifyToken, addUserToDepartment);
router.put("/change_user_department", verifyToken, changeUserDepartment);

const userRoutes = router
module.exports = userRoutes