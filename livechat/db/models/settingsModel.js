const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  settings: [this], // Recursive reference for nested settings
  value: String, // Present only for leaf settings
  field: String, // Present only for leaf settings; can be 'text', 'textarea', 'color'
}, { _id: false }); // _id is not necessary for nested settings

const SettingsGroupSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  settings: [SettingSchema] // Array of settings or nested settings
});

const getSettingsGroupModel = (db) => {
  return db.model('SettingsGroup', SettingsGroupSchema); // 'users' is the collection name
};

module.exports = getSettingsGroupModel;
