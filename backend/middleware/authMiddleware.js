const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log('Token not provided');
        return res.status(401).json({ message: 'Access Denied - Token is required' });
    }

    try {
        console.log('Token provided:', token);
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract the token correctly
        console.log('Decoded Token:', decoded); // Debug log

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            console.log('User not found for decoded ID');
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        console.log('Authenticated User:', req.user); // Debug log
        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(400).json({ message: 'Invalid Token' });
    }
}

module.exports = verifyToken;



