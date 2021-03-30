exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instructions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instructions").insert([
        {
          instruction_id: 1,
          instruction_description: "Heat oven to 350 degrees F",
          recipe_id: 1,
        },
        {
          instruction_id: 2,
          instruction_description: "Mix 1 cup butter with 2 cups flour",
          recipe_id: 1,
        },
        {
          instruction_id: 3,
          instruction_description:
            "Add 1 bag of chocolate chips to flour batter and mix well",
          recipe_id: 1,
        },
      ]);
    });
};
