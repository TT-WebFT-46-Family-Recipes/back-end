const express = require('express');
const Instruction = require('./instructions-model');
const {
  validateInstructions,
  validateInstructionsId,
} = require('../middleware/instructions-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Instruction.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', validateInstructionsId, (req, res) => {
  res.status(200).json(req.instruction);
});
router.post('/', validateInstructions, (req, res, next) => {
  Instruction.add(req.body)
    .then((instruction) => {
      res.status(201).json(instruction);
    })
    .catch((err) => {
      next(err);
    });
});
router.put(
  '/:id',
  validateInstructions,
  validateInstructionsId,
  (req, res, next) => {
    Instruction.update(req.params.id, req.body)
      .then((instruction) => {
        res.status(201).json(instruction);
      })
      .catch((err) => {
        next(err);
      });
  }
);
router.delete('/:id', validateInstructionsId, (req, res, next) => {
  Instruction.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'The Instruction has been deleted',
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
