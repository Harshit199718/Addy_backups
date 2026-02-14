const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastMessage: { type: String },
  lastSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  unreadCount: { type: Number, default: 0 },
  actives: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

const getChatModel = (db) => {
  return db.model('Chat', chatSchema);
};
module.exports = getChatModel;
