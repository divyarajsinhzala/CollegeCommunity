const Announcement = require("../models/Announcement");

// @desc    Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create announcement
exports.createAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  try {
    const announcement = await Announcement.create({ title, content });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: "Invalid announcement data" });
  }
};

// @desc    Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      await announcement.deleteOne();
      res.json({ message: "Announcement removed" });
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};