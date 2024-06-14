// Import JWT for token verification
const jwt = require('jsonwebtoken');
// Import the User model
const User = require('../models/User');
require('dotenv').config(); // Load environment variables from .env file

// Middleware function to verify JWT token
const verifyToken = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');

    if (!token) {
        console.log('Token not provided');
        return res.status(401).json({ message: 'Access Denied - Token is required' });
    }

    try {
        console.log('Token provided:', token);
        // Verify the token and decode it
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        // Find the user by ID and exclude the password field
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            console.log('User not found for decoded ID');
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        console.log('Authenticated User:', req.user);
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(400).json({ message: 'Invalid Token' });
    }
}

// Export the middleware function
module.exports = verifyToken;




