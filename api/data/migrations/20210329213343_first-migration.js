exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id');
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 150).notNullable();
    })
    .createTable('recipes', (tbl) => {
      tbl.increments('recipe_id');
      tbl.string('title', 128).notNullable().unique();
      tbl.string('author', 128).notNullable();
      tbl.string('category_name',128).notNullable()
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })
    .createTable('ingredients', (tbl) => {
      tbl.increments('ingredient_id');
      tbl.string('ingredient_amount', 128).notNullable();
      tbl.string('ingredient_name', 128).notNullable().unique();
      tbl
        .integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })
    .createTable('instructions', (tbl) => {
      tbl.increments('instruction_id');
      tbl.text('instruction_description').notNullable();
      tbl
        .integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
    .dropTableIfExists('users');
};
