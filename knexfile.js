// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       host: "localhost",
//       port: 5000,
//       database: "database_cookbook",
//       user: "postgres",
//       password: "NovaDee3189!",
//     },
//     migrations: {
//       directory: "./api/data/migrations",
//     },
//     seeds: {
//       directory: "./api/data/seeds",
//     },
//   },
// };

const pg = require("pg");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const sharedConfig = {
  client: "pg",
  migrations: { directory: "./api/data/migrations" },
  seeds: { directory: "./api/data/seeds" },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};
