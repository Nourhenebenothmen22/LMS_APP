const User = require('../models/user');

/**
 * @desc Find a user by email
 * @param {string} email - User email
 * @returns {Promise<User|null>}
 */
async function findUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = findUserByEmail;
