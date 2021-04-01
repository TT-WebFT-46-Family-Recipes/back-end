exports.seed = function (knex) {
  return knex('instructions')
    .del()
    .then(function () {
      return knex('instructions').insert([
        {
          instruction_id: 1,
          instruction_description: 'Heat oven to 350 degrees F',
          ingredient_id: 1,
        },
        {
          instruction_id: 2,
          instruction_description: 'Mix 1 cup butter with 2 cups flour',
          ingredient_id: 2,
        },
        {
          instruction_id: 3,
          instruction_description:
            'Add 1 bag of chocolate chips to flour batter and mix well',
          ingredient_id: 3,
        },
      ]);
    });
};
