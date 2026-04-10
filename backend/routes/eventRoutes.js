const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Get all events
// @route   GET /api/events
// @access  Private (Students & Admins)
router.get("/", protect, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error: Could not fetch events" });
  }
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { title, date, location, description } = req.body;

  if (!title || !date || !location || !description) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newEvent = new Event({
      title,
      date,
      location,
      description,
      registeredStudents: [] // Initialize empty for the .some() logic in frontend
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: "Invalid event data" });
  }
});

// @desc    Join an event
// @route   POST /api/events/:id/join
// @access  Private
router.post("/:id/join", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered using ID from JWT
    const alreadyRegistered = event.registeredStudents.find(
      (studentId) => studentId.toString() === req.user._id.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    event.registeredStudents.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "Successfully registered" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// @desc    Leave an event
// @route   POST /api/events/:id/leave
// @access  Private
router.post("/:id/leave", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove user ID from the array
    event.registeredStudents = event.registeredStudents.filter(
      (studentId) => studentId.toString() !== req.user._id.toString()
    );

    await event.save();
    res.status(200).json({ message: "Successfully unregistered" });
  } catch (err) {
    res.status(500).json({ message: "Unregistration failed" });
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event removed permanently" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;