const User = require('../users/users-model');
const db = require('../data/dbConfig');

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: `The user ID ${id} does not exist`,
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'User cannot be found',
    });
  }
}

function validateUser(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'Username and password are require',
    });
  } else {
    next();
  }
}

async function checkUsernameIsAvailable(req, res, next) {
  const userName = req.body.username;
  const username = await db('users').where('username', userName).first();
  if (username) {
    res.status(422).json({ message: 'This username is already taken' });
  } else {
    next();
  }
}

module.exports = {
  validateUser,
  validateUserId,
  checkUsernameIsAvailable,
};
