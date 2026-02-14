const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  type: { type: String },
  image: { type: String },
  message: { type: String, required: true },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});

const getMessageModel = (db) => {
  return db.model('Message', messageSchema); // 'users' is the collection name
};
module.exports = getMessageModel;
