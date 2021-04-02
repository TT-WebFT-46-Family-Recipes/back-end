const db = require('../data/dbConfig');

function find() {
  return db('users');
}
function findById(id) {
  return db('users').where('user_id', id).first();
}
async function add(user) {
  const [id] = await db('users').insert(user, 'user_id');
  return findById(id);
}
function update(id, user) {
  return db('users')
    .where('user_id', id)
    .update(user)
    .then(() => {
      return db('users').where('user_id', id).first();
    });
}
function remove(id) {
  return db('users')
    .where('user_id', id)
    .del()
    .then(() => {
      return db('users');
    });
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};
