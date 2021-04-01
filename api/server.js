// YOU DO NOT NEED TO TOUCH ANYMORE

// DEPENDENCIES -------->>>
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const restricted = require('./middleware/restricted');

const server = express();

// ROUTERS ---------->>>
const authRouter = require('./auth/auth-router');
// const usersRouter = require("./users/users-router");
const recipesRouter = require('./recipes/recipes-router');
const ingredientsRouter = require('./ingredients/ingredients-router');
const instructionsRouter = require('./instructions/instructions-router');

// MIDDLEWARE -------->>>
server.use(express.json());
server.use(helmet());
server.use(cors());

// CONNECT ROUTER TO SERVER --------->>>
server.use('/api/auth', authRouter);
server.use('/api/recipes', restricted, recipesRouter);
server.use('/api/ingredients', ingredientsRouter);
server.use('/api/instructions', instructionsRouter);
// server.use("/api/users", restricted, usersRouter);

// IS IT WORKING?
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hey there!' });
});

module.exports = server;
