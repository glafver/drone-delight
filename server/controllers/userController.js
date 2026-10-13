const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Validate input
  if (!username || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400);
    throw new Error("Username is already taken");
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    password: hashedPassword,
    favorites: [],
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // Respond with token and user info
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        favorites: user.favorites || [],
        savedForm: user.savedForm || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user favorites
// @route   PATCH /api/users/update/:id
// @access  Protected
const updateUserFavorites = async (req, res) => {
  const { id } = req.params;
  const { favorites } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { favorites },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update saved form
// @route   PATCH /api/users/saved-form/:id
const updateSavedForm = async (req, res) => {
  const { id } = req.params;
  const { savedForm } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { savedForm },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error saving form", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserFavorites,
  updateSavedForm,
};
