const db = require('../data/dbConfig');

function find() {
  return db('instructions');
}
function findById(id) {
  return db('instructions').where('instruction_id', id).first();
}
async function add(instruction) {
  const [id] = await db('instructions').insert(instruction, 'instruction_id');
  return findById(id);
}
function update(id, instruction) {
  return db('instructions')
    .where('instruction_id', id)
    .update(instruction)
    .then(() => {
      return db('instructions').where('instruction_id', id).first();
    });
}
function remove(id) {
  return db('instructions')
    .where('instruction_id', id)
    .del()
    .then(() => {
      return db('instructions');
    });
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};
