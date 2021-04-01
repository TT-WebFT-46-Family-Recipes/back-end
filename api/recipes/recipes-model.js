const db = require('../data/dbConfig');

function find() {
  return db('recipes');
}
function findById(id) {
  return db('recipes').where('recipe_id', id).first();
}
async function add(recipe) {
  const [id] = await db('recipes').insert(recipe, 'recipe_id');
  return findById(id);
}
function update(id, recipe) {
  return db('recipes')
    .where('recipe_id', id)
    .update(recipe)
    .then(() => {
      return db('recipes').where('recipe_id', id).first();
    });
}
function remove(id) {
  return db('recipes')
    .where('recipe_id', id)
    .del()
    .then(() => {
      return db('recipes');
    });
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  getRecipesIngredients,
};
