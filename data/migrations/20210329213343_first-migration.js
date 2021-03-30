exports.up = function (knex) {
  return knex.schema
    .createTable('ingredients', (tbl) => {
      tbl.increments('ingredient_id');
      tbl.string('ingredient_name', 128).notNullable().unique();
      tbl.float('ingredient_amount').notNullable();
      tbl.string('ingredient_measurement', 128).notNullable();
    })
    .createTable('instructions', (tbl) => {
      tbl.increments('instructions_id');
      tbl.string('instruction_description', 255).notNullable();
    })
    .createTable('categories', (tbl) => {
      tbl.increments('category_id');
      tbl.string('category_name', 128).notNullable().unique();
    })
    .createTable('recipes', (tbl) => {
      tbl.increments('recipe_id');
      tbl.string('recipe_name', 128).notNullable().unique();
      tbl.string('recipe_source', 128).notNullable();
      tbl
        .integer('ingredient_id')
        .unsigned()
        .motNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      tbl
        .integer('instruction_id')
        .unsigned()
        .motNullable()
        .references('instruction_id')
        .inTable('instructions')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      tbl
        .integer('category_id')
        .unsigned()
        .motNullable()
        .references('category_id')
        .inTable('categories')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients');
};
