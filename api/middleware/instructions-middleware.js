const Instruction = require('../instructions/instructions-model');

async function validateInstructionsId(req, res, next) {
  const { id } = req.params;
  try {
    const instruction = await Instruction.findById(id);
    if (!instruction) {
      res.status(404).json({
        message: `The instruction ID ${id} does not exist`,
      });
    } else {
      req.instruction = instruction;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'instructions cannot be found',
    });
  }
}

function validateInstructions(req, res, next) {
  if (!req.body.instruction_description) {
    res.status(400).json({
      message: 'Instructions are needed for Recipe',
    });
  } else {
    next();
  }
}

module.exports = {
  validateInstructionsId,
  validateInstructions,
};
