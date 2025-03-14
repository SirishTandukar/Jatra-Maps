const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  let pic = req.file ? req.file.path : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, pic, role: role || "user" });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to register user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    role: user.role,
    token: generateToken(user._id),
  });
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users.length) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

const getAllNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.seennotification.push(...user.notification);
  user.notification = [];
  await user.save();

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
    data: user,
  });
});

const deleteNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.notification = [];
  user.seennotification = [];
  await user.save();

  res.status(200).json({
    success: true,
    message: "All notifications deleted",
  });
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  getAllNotification,
  getAllUsers,
  deleteNotification,
};
