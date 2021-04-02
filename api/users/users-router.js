const express = require('express');
const User = require('./users-model');
const {
  checkUsernameIsAvailable,
  validateUser,
  validateUserId,
} = require('../middleware/users-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});
router.post('/', checkUsernameIsAvailable, validateUser, (req, res, next) => {
  User.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next(err);
    });
});
router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next(err);
    });
});
router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'The user has been deleted',
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
