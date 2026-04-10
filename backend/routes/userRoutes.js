const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  authUser, 
  updateUserProfile,
  getUsers,
  deleteUser 
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public
router.post("/login", authUser);
router.post("/register", registerUser);

// Admin: View Directory
router.route("/")
  .get(protect, admin, getUsers);

// Profile Update & Admin Delete
router.route("/:id")
  .put(protect, updateUserProfile)
  .delete(protect, admin, deleteUser);

module.exports = router; 