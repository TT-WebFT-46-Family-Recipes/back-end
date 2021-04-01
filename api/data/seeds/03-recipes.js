exports.seed = function (knex) {
  return knex('recipes')
    .del()
    .then(function () {
      return knex('recipes').insert([
        {
          recipe_id: 1,
          title: "Grandma's Chocolate Chip Cookies",
          author: 'Grandma Rose',
          category_name: 'Dessert',
          user_id: 1,
        },
      ]);
    });
};
