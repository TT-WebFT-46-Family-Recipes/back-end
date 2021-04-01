const Recipe = require('../recipes/recipes-model');
const db = require('../data/dbConfig');

async function validateRecipeId(req, res, next) {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).json({
        message: `The recipe ID ${id} does not exist`,
      });
    } else {
      req.recipe = recipe;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Recipe cannot be found',
    });
  }
}

function validateRecipes(req, res, next) {
  if (!req.body.title || !req.body.author) {
    res.status(400).json({
      message: 'Recipe title and author are require',
    });
  } else {
    next();
  }
}

async function checkRecipeNameIsAvailable(req, res, next) {
  const recipeTitle = req.body.title;
  const title = await db('recipes').where('title', recipeTitle).first();
  if (title) {
    res.status(422).json({ message: 'This recipe title is already taken' });
  } else {
    next();
  }
}

module.exports = {
  validateRecipeId,
  validateRecipes,
  checkRecipeNameIsAvailable,
};
