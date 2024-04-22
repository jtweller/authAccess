const mongoose = require('mongoose');
const User = require('../');

async function cleanupUsers() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
  try {
    // Find users created more than 1 hour ago
    const usersToDelete = await User.find({ createdAt: { $lt: oneHourAgo } });
    
    // Delete the users
    await Promise.all(usersToDelete.map(user => user.remove()));
    
    console.log(`Deleted ${usersToDelete.length} users created more than 1 hour ago.`);
  } catch (error) {
    console.error('Error cleaning up users:', error);
  }
}

module.exports = cleanupUsers;
