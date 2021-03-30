exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: 1,
          username: "admin",
          password:
            "$2a$05$R1oagF4fTIDfz6Ykg.L/W.7qGxNW8o8LVVNVF32Wlj7VOEQOgbc0W",
        },
        {
          user_id: 2,
          username: "elisan",
          password:
            "$2a$05$R1oagF4fTIDfz6Ykg.L/W.7qGxNW8o8LVVNVF32Wlj7VOEQOgbc0W",
        },
      ]);
    });
};
