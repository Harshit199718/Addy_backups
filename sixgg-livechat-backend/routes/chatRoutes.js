const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { getAllChats, getChat, searchChats, getChatWithUsername } = require("../controllers/chatController");
const router = express.Router();


router.get("/all", verifyToken, getAllChats);
router.get("/search", verifyToken, searchChats);
router.get("/username", getChatWithUsername);
router.get("/:chatId", getChat); // This should be at last

const chatRoutes = router;
module.exports = chatRoutes