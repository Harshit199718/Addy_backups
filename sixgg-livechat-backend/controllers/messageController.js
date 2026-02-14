// const Message = require("../models/message.model");

const { dbConnections } = require("../db/db");
const Message = require("../db/models/messageModel");

const createMessage = async ({ chatId, sender, message, type }) => {
    try {
        const newMessage = new Message({ chatId, sender, message, type });
        await newMessage.save();
        return Message.findById(newMessage._id).populate("sender")
    } catch (error) {}
}

const getAllMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const search = req.query.search;
        const lastMessageId = req.query.lastMessageId;  // Only used when scrolling, not initially on search
        const limit = parseInt(req.query.limit) || 50;

        let messages = [];
        let query = { chatId };

        if (search) {
            // When searching and not just loading more messages based on last seen
            if (!lastMessageId || (lastMessageId === "undefined") || (lastMessageId === "null")) {
                // Find the central message based on the search
                const searchedMessage = await Message.findOne({
                    chatId,
                    message: { $regex: new RegExp(search, 'i') }
                }).sort({ _id: -1 }).populate("sender");
                
                if (!searchedMessage) {
                    return;
                }
                
                const searchedId = searchedMessage._id;
                
                // Calculate limits for before and after
                let limitBefore = 4;
                let limitAfter = 5;
                const messagesBefore = await Message.find({
                    chatId,
                    _id: { $lt: searchedId }
                }).sort({ _id: -1 }).limit(limitBefore).populate("sender");
                
                // If less messages are returned before, increase after limit
                if (messagesBefore.length < limitBefore) {
                    limitAfter += (limitBefore - messagesBefore.length);
                }
                
                // Fetch messages after the searched message
                const messagesAfter = await Message.find({
                    chatId,
                    _id: { $gt: searchedId }
                }).sort({ _id: 1 }).limit(limitAfter).populate("sender");
                
                // If less messages are returned after, increase before limit and fetch more before messages if possible
                if (messagesAfter.length < limitAfter) {
                    const additionalBefore = limitAfter - messagesAfter.length;
                    if (additionalBefore > 0 && messagesBefore.length === limitBefore) {
                        const extraMessagesBefore = await Message.find({
                            chatId,
                            _id: { $lt: messagesBefore[messagesBefore.length - 1]._id }
                        }).sort({ _id: -1 }).limit(additionalBefore).populate("sender");
                        messagesBefore.push(...extraMessagesBefore);
                    }
                }
                
                // Combine all messages and sort by _id
                messages = [...messagesBefore, searchedMessage, ...messagesAfter].sort((a, b) => (a._id > b._id ? 1 : -1));
            } else {
                // Handle additional loading based on last seen message ID and direction
                const direction = req.query.direction || "prev";
                const sort = direction === "prev" ? { _id: -1 } : { _id: 1 };
                query._id = direction === "prev" ? { $lt: lastMessageId } : { $gt: lastMessageId };

                messages = await Message.find(query).sort(sort).limit(limit).populate("sender");

                if (direction === "prev") {
                    messages.reverse();
                }
            }
        } else {
            // Regular message fetching without search
            const direction = req.query.direction || "prev";
            const sort = direction === "prev" ? { _id: -1 } : { _id: 1 };

            if (lastMessageId && (lastMessageId !== "undefined") && (lastMessageId !== "null")) {
                query._id = direction === "prev" ? { $lt: lastMessageId } : { $gt: lastMessageId };
            }

            messages = await Message.find(query).sort(sort).limit(limit).populate("sender");

            if (direction === "prev") {
                messages.reverse();
            }
        }

        return res.status(200).json({
            status: true,
            data: messages
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllMessages, createMessage }