// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Import the User model
const User = require('../models/User');

// Define the cleanupUsers function to delete users created more than 1 hour ago
async function cleanupUsers() {
    // Calculate the timestamp for 1 hour ago dynamically
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
  
    try {
        // Find users created more than 1 hour ago
        const usersToDelete = await User.find({ createdAt: { $lt: oneHourAgo } });
  
        // Iterate over each user and remove them
        for (const user of usersToDelete) {
            await User.deleteOne({ _id: user._id });
        }
  
        console.log(`Deleted ${usersToDelete.length} users created more than 1 hour ago.`);
    } catch (error) {
        console.error('Error cleaning up users:', error);
    }
}
  
// Export the cleanupUsers function so it can be used elsewhere
module.exports = cleanupUsers;

