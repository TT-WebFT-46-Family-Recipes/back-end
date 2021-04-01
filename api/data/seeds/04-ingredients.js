exports.seed = function (knex) {
  return knex('ingredients')
    .del()
    .then(function () {
      return knex('ingredients').insert([
        {
          ingredient_id: 1,
          ingredient_amount: '2 cups',
          ingredient_name: 'flour',
          recipe_id: 1,
        },
        {
          ingredient_id: 2,
          ingredient_amount: '1 cup',
          ingredient_name: 'butter',
          recipe_id: 1,
        },
        {
          ingredient_id: 3,
          ingredient_amount: '1 bag',
          ingredient_name: 'chocolate chips',
          recipe_id: 1,
        },
      ]);
    });
};
