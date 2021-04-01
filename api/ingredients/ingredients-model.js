const db = require('../data/dbConfig');

function find() {
  return db('ingredients');
}
function findById(id) {
  return db('ingredients').where('ingredient_id', id).first();
}
async function add(ingredient) {
  const [id] = await db('ingredients').insert(ingredient, 'ingredient_id');
  return findById(id);
}
function update(id, ingredient) {
  return db('ingredients')
    .where('ingredient_id', id)
    .update(ingredient)
    .then(() => {
      return db('ingredients').where('ingredient_id', id).first();
    });
}
function remove(id) {
  return db('ingredients')
    .where('ingredient_id', id)
    .del()
    .then(() => {
      return db('ingredients');
    });
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};
