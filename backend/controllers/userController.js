const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Controller function to create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
};

// Controller function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while getting users' });
  }
};

// Controller function to get the profile of the logged-in user
const getUserProfile = async (req, res) => {
  try {
    const { _id, firstName, lastName, email } = req.user;
    res.status(200).json({ _id, firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the user profile' });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.deleteOne({ _id: userId });

    if (deletedUser.deletedCount === 1) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update the profile of the logged-in user
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.status(200).json({ _id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, email: updatedUser.email });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};

// Update user password
const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not associated with a valid account' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const message = `You are receiving this email because you (or someone else) have requested a password reset. Please click the following link to reset your password: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'Password reset email sent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  createUser, 
  loginUser, 
  getAllUsers, 
  deleteUser, 
  getUserProfile, 
  updateUserProfile, 
  updateUserPassword, 
  requestPasswordReset,
  resetPassword 
};


