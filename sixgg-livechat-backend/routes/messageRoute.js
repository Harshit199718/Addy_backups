const express = require("express");
const { getAllMessages } = require("../controllers/messageController");
const router = express.Router();


router.get("/all/:chatId", getAllMessages);

const messageRoutes = router;
module.exports = messageRoutes