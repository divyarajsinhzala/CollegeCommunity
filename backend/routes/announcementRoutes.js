const express = require("express");
const router = express.Router();
const { 
  getAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement 
} = require("../controllers/announcementController");
const { protect, admin } = require("../middleware/authMiddleware");

// Students can GET, but only Admins can POST and DELETE
router.route("/")
  .get(getAnnouncements)
  .post(protect, admin, createAnnouncement);

router.route("/:id")
  .delete(protect, admin, deleteAnnouncement);

module.exports = router;