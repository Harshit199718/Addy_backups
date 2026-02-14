const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { getAllChats, getChat } = require("../controllers/chatController");
const router = express.Router();


router.get("/all/:agentId", verifyToken, getAllChats);
router.get("/:chatId", getChat);

const chatRoutes = router;
module.exports = chatRoutes