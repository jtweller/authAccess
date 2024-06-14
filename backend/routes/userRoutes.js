// Import Express to create a router
const express = require('express');
const router = express.Router();
// Import the user controller to handle user-related requests
const userController = require('../controllers/userController');
// Import authentication middleware to protect certain routes
const authMiddleware = require('../middleware/authMiddleware');

// Define routes for user-related actions
router.post('/signup', userController.createUser); // Route for user signup
router.post('/login', userController.loginUser); // Route for user login
router.get('/users', authMiddleware, userController.getAllUsers); // Route to get all users, protected by auth middleware
router.delete('/:userId', userController.deleteUser); // Route to delete a user by ID

// Define routes for profile-related actions
router.get('/profile', authMiddleware, userController.getUserProfile); // Route to get user profile, protected by auth middleware
router.put('/profile', authMiddleware, userController.updateUserProfile); // Route to update user profile, protected by auth middleware

// Export the router to use it in the main server file
module.exports = router;


