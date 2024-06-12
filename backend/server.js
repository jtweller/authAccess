// declare dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Import user cleanup script
const cleanupUsers = require('./userCleanup/userCleanup');

// declare app and PORT
const app = express();
const PORT = 8000;

// connect to database
mongoose.connect(process.env.MONGODB_URI, {

  }).then(() => {
    console.log('Connected to the database');
    // Start the cleanup process immediately when the application starts
    cleanupUsers();
    // Run cleanupUsers every hour
    setInterval(cleanupUsers, 60 * 60 * 1000);
  }).catch((error) => {
    console.log('Database connection error:', error.message);
  });

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

