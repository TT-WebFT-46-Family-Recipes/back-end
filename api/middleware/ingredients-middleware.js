const Ingredient = require('../ingredients/ingredients-model');

async function validateIngredientId(req, res, next) {
  const { id } = req.params;
  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      res.status(404).json({
        message: `The ingredient ID ${id} does not exist`,
      });
    } else {
      req.ingredient = ingredient;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'ingredient cannot be found',
    });
  }
}

function validateIngredients(req, res, next) {
  if (!req.body.ingredient_amount || !req.body.ingredient_name) {
    res.status(400).json({
      message: 'Ingredient amount and name are require',
    });
  } else {
    next();
  }
}

module.exports = {
  validateIngredientId,
  validateIngredients,
};
