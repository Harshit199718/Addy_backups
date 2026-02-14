const { createMessage } = require("../controllers/messageController");
const { dbConnections } = require("../db/db");
const getChatModel = require("../db/models/chatModel");
const getUserModel = require("../db/models/userModel");
const getMessage = require("../utils/prefefinedMessage");
const { UPDATE_CHAT, NEW_MESSAGE, RECEIVE_MESSAGE, AUTOMATIC_MESSAGE } = require("./events");

const defineMessageEvents = (io, socket, siteName, userSockets) => {
  socket.on(NEW_MESSAGE, async ({ chatId, senderId, message, type }) => {
    const Chat = getChatModel(dbConnections[siteName]);
    const User = getUserModel(dbConnections[siteName]);
    const user = await User.findById(senderId);
    if (user?.block) {
      return;
    }
    console.log(`Message ${message} from ${senderId} in ${chatId}`);
    const messageData = {
      chatId,
      sender: senderId,
      message,
      type
    };
    const newMessage = await createMessage(messageData, siteName);
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $set: {
          lastMessage: message,
          lastSender: senderId,
        },
        $inc: { unreadCount: 1 }, // Increment unreadCount by 1
      },
      { new: true } // Return the modified document rather than the original
    )
      .populate("user")
      .populate("agent");
    // Emit the message to everyone in the chat room
    io.to(chatId).emit(RECEIVE_MESSAGE, newMessage);
    const socketToSend =
      senderId === chat.user._id.toString()
        ? userSockets[chat.agent._id.toString()]
        : userSockets[chat.user._id.toString()];
    if (socketToSend) {
      io.to(socketToSend.id).emit(UPDATE_CHAT, chat);
    }
  });
  // Automatic Messages
  socket.on(AUTOMATIC_MESSAGE, async (result) => {
    const Chat = getChatModel(dbConnections[siteName]);
    try {
      const { chatId, type, data = {} } = result;
      const chat = await Chat.findById(chatId).populate("user");
      const messageData = {
        chatId,
        sender: chat.agent,
        message: await getMessage({
          type,
          data,
          siteName,
        }),
      };
      const newMessage = await createMessage(messageData, siteName);
      io.to(chatId).emit(RECEIVE_MESSAGE, newMessage);
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = { defineMessageEvents };
