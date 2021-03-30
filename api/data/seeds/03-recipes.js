exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          recipe_id: 1,
          title: "Grandma's Chocolate Chip Cookies",
          author: "Grandma Rose",
          category_id: 1,
          user_id: 1,
        },
        // { title: 2, author: "rowValue2", category_id: 1, user_id: 1 },
        // { title: 3, author: "rowValue3", category_id: 1, user_id: 2 },
      ]);
    });
};
