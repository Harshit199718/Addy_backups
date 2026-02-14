const getChatModel = require("../db/models/chatModel");
const getUserModel = require("../db/models/userModel");

async function createChat(req, res, next) {
    const Chat = getChatModel(req.dbConnection);
    try {
        const chat = new Chat(req.chatPayload)
        await chat.save();
        return chat;
    } catch (error) {
        next(error);
    }
}

const getAllChats = async (req, res, next) => {
    const Chat = getChatModel(req.dbConnection);
    const User = getUserModel(req.dbConnection);
    try {
        const { agentId } = req.params;
        const chats = await Chat.find({agent: agentId}).populate("user")
        res.status(200).json({
            status: true,
            data: chats
        })
    } catch (error) {
        next(error)
    }
}

const getChat = async (req, res, next) => {
    const Chat = getChatModel(req.dbConnection);
    const User = getUserModel(req.dbConnection);
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId).populate("user").populate("agent")
        res.status(200).json({
            status: true,
            data: chat
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createChat, getAllChats, getChat}