const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

const getDepartmentModel = (db) => {
  return db.model('Department', departmentSchema);
};
module.exports = getDepartmentModel;