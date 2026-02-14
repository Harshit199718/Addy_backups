const { dbConnections } = require("../db/db");
const getChatModel = require("../db/models/chatModel");
const getUserModel = require("../db/models/userModel");
const { UPDATE_CHAT, ON_ACTIVE, INACTIVE, TYPING, STOP_TYPING } = require("./events");

const defineUserEvents = (io, socket, siteName, userSockets) => {
  socket.on(ON_ACTIVE, async ({ userId }) => {
    const Chat = getChatModel(dbConnections[siteName]);
    const User = getUserModel(dbConnections[siteName]);
    const user = await User.findById(userId, { role: 1 });
    await Chat.updateMany(
      { $or: [{ user: userId }, { agent: userId }] },
      { $addToSet: { actives: userId } }
    );
    const chats = await Chat.find({
      $or: [{ user: userId }, { agent: userId }],
    })
      .populate("user")
      .populate("agent");
    chats.forEach((chat) => {
      io.to(
        userSockets[
          chat[user.role === "user" ? "agent" : "user"]._id.toString()
        ]?.id
      ).emit(UPDATE_CHAT, chat);
    });
  });

  socket.on(INACTIVE, async ({ userId }) => {
    const Chat = getChatModel(dbConnections[siteName]);
    const User = getUserModel(dbConnections[siteName]);
    const user = await User.findById(userId, { role: 1 });
    await Chat.updateMany(
      { $or: [{ user: userId }, { agent: userId }] },
      { $pull: { actives: userId } }
    );
    const chats = await Chat.find({
      $or: [{ user: userId }, { agent: userId }],
    })
      .populate("user")
      .populate("agent");
    chats.forEach((chat) => {
      io.to(
        userSockets[
          chat[user.role === "user" ? "agent" : "user"]._id.toString()
        ]?.id
      ).emit(UPDATE_CHAT, chat);
    });
  });

  socket.on(TYPING, ({ chatId, userId }) => {
    socket.to(chatId).emit(TYPING, { chatId, userId });
  });

  socket.on(STOP_TYPING, ({ chatId, userId }) => {
    socket.to(chatId).emit(STOP_TYPING, { chatId, userId });
  });
};

module.exports = { defineUserEvents };
