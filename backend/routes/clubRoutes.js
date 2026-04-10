const express = require("express");
const router = express.Router();
const { getClubs, createClub } = require("../controllers/clubController");

router.get("/", getClubs);
router.post("/", createClub);

module.exports = router;