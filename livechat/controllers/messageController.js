// const Message = require("../models/message.model");

const { dbConnections } = require("../db/db");
const getMessageModel = require("../db/models/messageModel");

const createMessage = async ({chatId, sender, message, type, filePath}, siteName) => {
    try {
        const Message = getMessageModel(dbConnections[siteName]);
        const newMessage = new Message({ chatId, sender, message, type });
        await newMessage.save();
        return newMessage
    } catch (error) {
        console.log(error)
    }
}
const getAllMessages = async (req, res, next) => {
    try {
        const Message = getMessageModel(req.dbConnection);
        const { chatId } = req.params;
        const chats = await Message.find({chatId})
        res.status(200).json({
            status: true,
            data: chats
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllMessages, createMessage}