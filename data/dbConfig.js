const knex = require("knex");
const knexConfig = require("../knexfile");
const envrironment = process.env.NODE_ENV || "development";

module.exports = knex(knexConfig[envrironment]);
