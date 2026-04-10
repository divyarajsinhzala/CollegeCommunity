const Event = require("../models/Event");

// GET: Fetch all events
// controllers/eventController.js

exports.getEvents = async (req, res) => {
  try {
    // This is the MAGIC line that swaps IDs for Names in the API response
    const events = await Event.find().populate("registeredStudents", "firstName lastName email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// POST: Register for an event
exports.joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered to prevent duplicates
    if (!event.registeredStudents.includes(req.body.userId)) {
      event.registeredStudents.push(req.body.userId);
      await event.save();
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error joining event" });
  }
};

// POST: Unregister from an event
exports.leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Remove the student ID from the array
    event.registeredStudents = event.registeredStudents.filter(
      (id) => id.toString() !== req.body.userId
    );

    await event.save();
    res.status(200).json({ message: "Unregistered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error leaving event" });
  }
};

// Admin: Create Event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Creation failed" });
  }
};

// Admin: Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};