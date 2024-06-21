// Import Mongoose to define a schema
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true // First name is required
  },
  lastName: {
    type: String,
    required: true // Last name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true // Email must be unique
  },
  password: {
    type: String,
    required: true // Password is required
  },
  resetPasswordToken: { 
    type: String 
  },  // Add resetPasswordToken field
  resetPasswordExpires: { 
    type: Date 
  }, // Add resetPasswordExpires field
  createdAt: {
    type: Date,
    default: Date.now // Default to the current date/time when the user is created
  }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other files
module.exports = User;
