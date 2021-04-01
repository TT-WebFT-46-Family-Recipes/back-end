const express = require('express');
const Ingredient = require('./ingredients-model');
const {
  validateIngredientId,
  validateIngredients,
} = require('../middleware/ingredients-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Ingredient.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', validateIngredientId, (req, res) => {
  res.status(200).json(req.ingredient);
});
router.post('/', validateIngredients, (req, res, next) => {
  Ingredient.add(req.body)
    .then((ingredient) => {
      res.status(201).json(ingredient);
    })
    .catch((err) => {
      next(err);
    });
});
router.put(
  '/:id',
  validateIngredients,
  validateIngredientId,
  (req, res, next) => {
    Ingredient.update(req.params.id, req.body)
      .then((ingredient) => {
        res.status(201).json(ingredient);
      })
      .catch((err) => {
        next(err);
      });
  }
);
router.delete('/:id', validateIngredientId, (req, res, next) => {
  Ingredient.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'The Ingredient has been deleted',
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
