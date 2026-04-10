const Club = require("../models/Club");

const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching clubs" });
  }
};

const createClub = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const club = await Club.create({ name, description, category });
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: "Server error creating club" });
  }
};

module.exports = { getClubs, createClub };