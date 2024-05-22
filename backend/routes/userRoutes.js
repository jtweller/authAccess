const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User Routes
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.delete('/:userId', userController.deleteUser);

// Profile Route
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
