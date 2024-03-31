// declare dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// declare app and PORT
const app = express();
const PORT = 8000;

// connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to the database');
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
