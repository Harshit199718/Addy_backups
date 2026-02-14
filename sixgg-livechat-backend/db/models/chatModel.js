const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  lastMessage: { type: String },
  lastSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastMessageTime: { type: Date },
  unreadCount: { type: Number, default: 0 },
  actives: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  site: {type: String, required: true},
  instance: {type: String, required: true}
}, {
  timestamps: true
});

chatSchema.pre('save', function(next) {
  if (!this.lastMessageTime) {
    this.lastMessageTime = this.createdAt;
  }
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
