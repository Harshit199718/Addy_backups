const { dbConnections } = require("../db/db");
const getChatModel = require("../db/models/chatModel");
const getUserModel = require("../db/models/userModel");
const { JOIN_CHAT, MARK_READ, UPDATE_CHAT } = require("./events");

const defineChatEvents = (io, socket, siteName, userSockets) => {
  socket.on(JOIN_CHAT, ({ chatId }) => {
    // This is a simple example. You would check if the user belongs to the chatId in a real app
    socket.join(chatId);
    console.log(`joined chat ${chatId}`);
  });

  socket.on(MARK_READ, async (chatId) => {
    const Chat = getChatModel(dbConnections[siteName]);
    const User = getUserModel(dbConnections[siteName]);

    // This is a simple example. You would check if the user belongs to the chatId in a real app
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        unreadCount: 0, // Increment unreadCount by 1
      },
      { new: true } // Return the modified document rather than the original
    )
      .populate("user")
      .populate("agent");
    io.to(userSockets[updatedChat.agent._id.toString()].id).emit(
      UPDATE_CHAT,
      updatedChat
    );
  });
};

module.exports = { defineChatEvents };
