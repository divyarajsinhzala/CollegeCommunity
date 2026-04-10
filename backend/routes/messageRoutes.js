const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages for Admin (Newest first)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Toggle visibility of ONE specific message
router.patch("/:id/toggle", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    // Flip only this message's status
    message.status = message.status === "Visible" ? "Hidden" : "Visible";
    await message.save();

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a specific message
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Post removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;