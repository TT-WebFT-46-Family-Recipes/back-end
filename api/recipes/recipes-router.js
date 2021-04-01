const express = require('express');
const Recipe = require('./recipes-model');
const {
  validateRecipeId,
  validateRecipes,
  checkRecipeNameIsAvailable,
} = require('../middleware/recipes-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Recipe.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', validateRecipeId, (req, res) => {
  res.status(200).json(req.recipe);
});
router.post(
  '/',
  validateRecipes,
  checkRecipeNameIsAvailable,
  (req, res, next) => {
    Recipe.add(req.body)
      .then((recipe) => {
        res.status(201).json(recipe);
      })
      .catch((err) => {
        next(err);
      });
  }
);
router.put('/:id', validateRecipes, validateRecipeId, (req, res, next) => {
  Recipe.update(req.params.id, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch((err) => {
      next(err);
    });
});
router.delete('/:id', validateRecipeId, (req, res, next) => {
  Recipe.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'The Recipe has been deleted',
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
