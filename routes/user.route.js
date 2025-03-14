const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
  getAllNotification,
  deleteNotification,
  getAllUsers,
} = require("../controllers/user.controller");

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", authUser);

// Get all users
router.get("/users", allUsers);

// Get all users (alternative)
router.get("/all-users", getAllUsers);

// Mark all notifications as read
router.post("/notifications/read", getAllNotification);

// Delete all notifications
router.delete("/notifications", deleteNotification);

module.exports = router;
