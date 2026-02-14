const { dbConnections } = require("../db/db");
const Chat = require("../db/models/chatModel");
const getChatModel = require("../db/models/chatModel");
const User = require("../db/models/userModel");
const getUserModel = require("../db/models/userModel");
const { UPDATE_CHAT, ON_ACTIVE, INACTIVE, TYPING, STOP_TYPING } = require("./events");

const defineUserEvents = (io, socket, sites, userSockets, instance) => {
  socket.on(ON_ACTIVE, async ({ userId }) => {
    try {
      const user = await User.findById(userId, { role: 1 });
      await Chat.updateMany(
        { $or: [{ user: userId }, { agent: userId }], site: sites, instance},
        { $addToSet: { actives: userId } },
      );
      const chats = await Chat.find({
        $or: [{ user: userId }, { agent: userId }],
        site: sites,
        instance
      })
        .populate("user")
        .populate("agents");
      chats.forEach((chat) => {
        const sockets = userSockets[chat[user.role === "user" ? "agent" : "user"]?._id?.toString()]
        if (sockets?.length) {
          sockets.forEach(conn => {
            io.to(conn.id).emit(UPDATE_CHAT, chat);
          })
        }
      }); 
    } catch (error) {}
  });

  socket.on(INACTIVE, async ({ userId }) => {
    try {
      const user = await User.findById(userId, { role: 1 });
      await Chat.updateMany(
        { $or: [{ user: userId }, { agent: userId }], site: sites, instance },
        { $pull: { actives: userId } }
      );
      const chats = await Chat.find({
        $or: [{ user: userId }, { agent: userId }],
        site: sites,
        instance
      })
        .populate("user")
        .populate("agents");
      chats.forEach((chat) => {
        const sockets = userSockets[chat[user.role === "user" ? "agent" : "user"]?._id.toString()]
        if (sockets?.length) {
          sockets.forEach(conn => {
            io.to(conn.id).emit(UPDATE_CHAT, chat);
          })
        }
      });
    } catch (error) {}
  });

  socket.on(TYPING, async ({ chatId, userId }) => {
    try {
      socket.to(chatId).emit(TYPING, { chatId, userId });
      
      const chat = await Chat.findById(chatId)
      .populate("user")
      console.log("Typing", userId?.toString(), chat.user._id?.toString())
      if (userId?.toString()===chat.user._id?.toString()) {
        chat.agents.forEach(agent => {
          const agentSockets = userSockets[agent.toString()]
          if (agentSockets?.length) {
            agentSockets.forEach(conn => {
              io.to(conn.id).emit(TYPING, { chatId, userId });
            })
          }
        })
      }
    } catch (error) {}
  });

  socket.on(STOP_TYPING, async ({ chatId, userId }) => {
    try {
      socket.to(chatId).emit(STOP_TYPING, { chatId, userId });

      const chat = await Chat.findById(chatId)
        .populate("user")
      console.log("Typing STOP_TYPING", userId?.toString(), chat.user._id?.toString())
      if (userId?.toString()===chat.user._id?.toString()) {
        chat.agents.forEach(agent => {
          const agentSockets = userSockets[agent.toString()]
          if (agentSockets?.length) {
            agentSockets.forEach(conn => {
              io.to(conn.id).emit(STOP_TYPING, { chatId, userId });
            })
          }
        })
      }
    } catch (error) {}
  });
};

module.exports = { defineUserEvents };
