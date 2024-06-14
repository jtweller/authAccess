// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import JWT for creating tokens
const jwt = require('jsonwebtoken');
// Import the User model
const User = require('../models/User');

// Controller function to create a new user
const createUser = async (req, res) => {
  // Extract user details from the request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the provided details
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors that occur during the user creation process
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
};

// Controller function to log in a user
const loginUser = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Respond with a success message and the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database, selecting only their first and last names
    const users = await User.find({}, 'firstName lastName');
    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors that occur while fetching users
    res.status(500).json({ message: 'An error occurred while getting users' });
  }
};

// Controller function to get the profile of the logged-in user
const getUserProfile = async (req, res) => {
  try {
    console.log('User profile data:', req.user); // Debug log
    // Fetch user profile info from req.user (set by auth middleware)
    const { _id, firstName, lastName, email } = req.user;
    console.log(_id);
    // Respond with the user's profile info
    res.status(200).json({ _id, firstName, lastName, email });
  } catch (error) {
    console.error('Error fetching user profile:', error); // Debug log
    // Handle any errors that occur while fetching the user profile
    res.status(500).json({ message: 'An error occurred while fetching the user profile' });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;
    // Attempt to delete the user with the specified ID from the database
    const deletedUser = await User.deleteOne({ _id: userId });
    
    // Check if a user was deleted
    if (deletedUser.deletedCount === 1) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the user deletion process
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update the profile of the logged-in user
const updateUserProfile = async (req, res) => {
  try {
    // Extract new profile details from the request body
    const { firstName, lastName, email } = req.body;
    // Find the user in the database by their ID (set by auth middleware)
    const user = await User.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile details with the provided values
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    // Save the updated user details to the database
    const updatedUser = await user.save();

    // Respond with the updated user details
    res.status(200).json({ _id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, email: updatedUser.email });
  } catch (error) {
    // Handle any errors that occur during the profile update process
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};

// Export all controller functions for use in routes
module.exports = { createUser, loginUser, getAllUsers, deleteUser, getUserProfile, updateUserProfile };

