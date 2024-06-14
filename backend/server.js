// Import dependencies
const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // Mongoose for interacting with MongoDB
const cors = require('cors'); // CORS middleware to enable Cross-Origin Resource Sharing
const userRoutes = require('./routes/userRoutes'); // Import user routes
require('dotenv').config(); // Load environment variables from .env file

// Import user cleanup script
const cleanupUsers = require('./userCleanup/userCleanup');

// Create an Express application
const app = express();
// Define the port the server will run on
const PORT = 8000;

// Connect to the MongoDB database using the connection string from the .env file
mongoose.connect(process.env.MONGODB_URI, {
  // Use New URL parser and Unified Topology for MongoDB connection
}).then(() => {
    console.log('Connected to the database');
    // Start the cleanup process immediately when the application starts
    cleanupUsers();
    // Run cleanupUsers every hour
    setInterval(cleanupUsers, 60 * 60 * 1000);
}).catch((error) => {
    console.log('Database connection error:', error.message);
});

// Use CORS middleware to handle cross-origin requests
app.use(cors());
// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Use user routes for any requests to /api/users
app.use('/api/users', userRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

