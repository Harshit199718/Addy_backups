const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false},
  host: { type: String, required: true},
  assignedChat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  role: { type: String, enum: ["user", "agent", "admin", "anonymous"], required: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  refreshToken: { type: String },
  block: { type: Boolean, default: false },
  sites: [{ type: String, required: true }],
  instance: {type: String, required: true}
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
userSchema.index({ username: 1, role: 1 });

const User = mongoose.model("User", userSchema)

module.exports = User;
