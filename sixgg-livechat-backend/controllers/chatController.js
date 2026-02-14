const Chat = require("../db/models/chatModel");
const User = require("../db/models/userModel");

async function createChat(req, res, next) {
    try {
        const chat = new Chat({...req.chatPayload, instance: req.instance})
        await chat.save();
        return chat;
    } catch (error) {
        next(error);
    }
}

const getAllChats = async (req, res, next) => {
    try {
        const lastChatId = req.query.lastChatId;
        const site = req.query.site;
        const query = {agents: req.user.id};
        if (!req.isSuperBO) {
            query.instance = req.instance
        }
        if (lastChatId) {
            // Fetch the last chat to get its lastMessageTime
            const lastChat = await Chat.findById(lastChatId);
            if (lastChat) {
                // Include chats with a later lastMessageTime or with the same lastMessageTime but a greater _id
                query.$or = [
                    { lastMessageTime: { $lt: lastChat.lastMessageTime } },
                    { 
                        lastMessageTime: lastChat.lastMessageTime, 
                        _id: { $gt: lastChat._id } 
                    }
                ];
            }
        }
        if (site) {
            query.site = site
        }
        const chats = await Chat.find(query).sort({ lastMessageTime: -1 }).limit(8).populate("user")
        res.status(200).json({
            status: true,
            data: chats
        })
    } catch (error) {
        next(error)
    }
}

const searchChats = async (req, res, next) => {
    try {
        const search = req.query.search;
        const users = await User.find({username: { $regex: new RegExp(`${search}`, 'i') }}).select('_id')
        const userIds = users.map(user => user?._id)
        const query = {agents: req.user.id, instance: req.instance, user: { $in: userIds }};
        const chats = await Chat.find(query).sort({ lastMessageTime: -1}).populate("user")
        res.status(200).json({
            status: true,
            data: chats
        })
    } catch (error) {
        next(error)
    }
}

const getChat = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId).populate("user").populate("agents")
        res.status(200).json({
            status: true,
            data: chat
        })
    } catch (error) {
        next(error)
    }
}

const getChatWithUsername = async (req, res, next) => {
    try {
        const { username, site } = req.query;
        const user = await User.findOne({username: `${username}_user`, sites: site , instance: req.instance})
        const chat = await Chat.findById(user.assignedChat).populate("user").populate("agents")
        res.status(200).json({
            status: true,
            data: chat
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createChat, getAllChats, getChat, searchChats, getChatWithUsername}