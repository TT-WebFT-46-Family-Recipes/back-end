require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'recipes',
      user: 'postgres',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  // not sure what goes in production yet
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
