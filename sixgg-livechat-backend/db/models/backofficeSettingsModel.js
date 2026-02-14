const mongoose = require('mongoose');

const BackofficeColorsSchema = new mongoose.Schema({
  primary: { type: String, required: true, default: "#7792B1" },
  secondary: { type: String, required: true, default: "#6993FF" },
  tertiary: { type: String, required: true, default: "#ddd" },
  instance: { type: String, required: true },
}); // _id is not necessary for nested settings

const BackofficeColors = mongoose.model('BackofficeColors', BackofficeColorsSchema); // 'users' is the collection name

module.exports = BackofficeColors;
