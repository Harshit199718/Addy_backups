const { createMessage } = require("../controllers/messageController");
const { dbConnections } = require("../db/db");
const Chat = require("../db/models/chatModel");
const getChatModel = require("../db/models/chatModel");
const User = require("../db/models/userModel");
const getUserModel = require("../db/models/userModel");
const getMessage = require("../utils/prefefinedMessage");
const { UPDATE_CHAT, NEW_MESSAGE, RECEIVE_MESSAGE, AUTOMATIC_MESSAGE } = require("./events");

const defineMessageEvents = (io, socket, siteName, userSockets, instance) => {
  socket.on(NEW_MESSAGE, async ({ chatId, senderId, message, type }) => {
    try {
      const user = await User.findById(senderId);
      if (user?.block) {
        return;
      }
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
            lastMessageTime: newMessage.createdAt
          },
          $inc: { unreadCount: 1 }, // Increment unreadCount by 1
        },
        { new: true } // Return the modified document rather than the original
      )
        .populate("user")
        .populate("agents");
      // Emit the message to everyone in the chat room
      io.to(chatId).emit(RECEIVE_MESSAGE, newMessage);
      if (senderId === chat.user._id.toString()) {
        chat.agents.forEach(agent => {
          const agentSockets = userSockets[agent._id.toString()]
          if (agentSockets?.length) {
            agentSockets.forEach(conn => {
              io.to(conn.id).emit(UPDATE_CHAT, chat, true);
            })
          }
        })
      } else {
        const userSockets2 = userSockets[chat.user._id.toString()]
        if (userSockets2?.length) {
          userSockets2.forEach(conn => {
            io.to(conn.id).emit(UPDATE_CHAT, chat);
          })
        }
      }
    } catch (error) {}
  });
  // Automatic Messages
  socket.on(AUTOMATIC_MESSAGE, async (result) => {
    try {
      const { chatId, type, data = {} } = result;
      const chat = await Chat.findById(chatId).populate("user");
      const messageData = {
        chatId,
        sender: chat.agents[0],
        message: await getMessage({
          type,
          data,
          site: chat.user.sites[0],
          instance
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
