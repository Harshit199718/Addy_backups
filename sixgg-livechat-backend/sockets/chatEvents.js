const { dbConnections } = require("../db/db");
const Chat = require("../db/models/chatModel");
const getChatModel = require("../db/models/chatModel");
const getUserModel = require("../db/models/userModel");
const { JOIN_CHAT, MARK_READ, UPDATE_CHAT } = require("./events");

const defineChatEvents = (io, socket, siteName, userSockets) => {
  socket.currentChatRoom = null;

  socket.on(JOIN_CHAT, ({ chatId }) => {
    try {
      // Leave the previous chat room if there is one
      if (socket.currentChatRoom) {
        socket.leave(socket.currentChatRoom);
      }
  
      // Join the new chat room
      socket.join(chatId);
      socket.currentChatRoom = chatId;
    } catch (error) {}
  });

  socket.on(MARK_READ, async (chatId) => {
    try {
      // This is a simple example. You would check if the user belongs to the chatId in a real app
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          unreadCount: 0, // Increment unreadCount by 1
        },
        { new: true } // Return the modified document rather than the original
      )
        .populate("user")
        .populate("agents");
      updatedChat.agents.forEach(agent => {
        if (userSockets[agent._id.toString()]?.length) {
          userSockets[agent._id.toString()].forEach(conn => {
            io.to(conn.id).emit(UPDATE_CHAT, updatedChat);
          })
        }
      })
    } catch (error) {}
  });
};

module.exports = { defineChatEvents };
