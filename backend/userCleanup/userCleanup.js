const mongoose = require('mongoose');
const User = require('../models/User');

async function cleanupUsers() {
    // Calculate the timestamp for 10 minutes ago dynamically
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 10 minutes ago
  
    try {
      // Find users created more than 10 minutes ago
      const usersToDelete = await User.find({ createdAt: { $lt: oneHourAgo } });
  
      // Iterate over each user and remove them
      for (const user of usersToDelete) {
        await User.deleteOne({ _id: user._id });
      }
  
      console.log(`Deleted ${usersToDelete.length} users created more than 10 minutes ago.`);
    } catch (error) {
      console.error('Error cleaning up users:', error);
    }
  }
  

module.exports = cleanupUsers;
