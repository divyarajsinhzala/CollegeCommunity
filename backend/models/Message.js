const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  pfp: { type: String }, // Stores avatar URL
  time: { type: String },
  status: { type: String, default: "Visible" } // For admin moderation
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);