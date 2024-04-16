const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while getting users' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Fetch user profile info from req.user (set by auth middleware)
    const { _id, firstName, lastName, email } = req.user;
    console.log(_id)
    // Respond with the user's profile info
    res.status(200).json({ _id, firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the user profile' });
  }
};

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

module.exports = { deleteUser };

module.exports = { createUser, loginUser, getAllUsers, deleteUser, getUserProfile };