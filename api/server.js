const express = require("express");
const server = express();
const cors = require("cors");

const AuthRouter = require("./auth/auth-router");
const RecipesRouter = require("./recipes/recipes-router");

server.use(express.json());
server.use("/api/auth", AuthRouter);
server.use("/api/recipes", RecipesRouter);

// check to see what envrironment you are currently in
console.log(process.env.NODE_ENV);

// on Heroku machine, an env variable is called "NODE_ENV" -> "production"
if (process.env.NODE_ENV === "development") {
  server.use(cors());
}

// Our API comes earlier in the pipeline -> Test endpoint
server.get("/api/hello", (req, res) => {
  res.json({ message: "Hey there!" });
});

// ERROR MIDDLEWARE
server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message, // DEVELOPMENT ONLY
    stack: err.stack, // DEVELOPMENT ONLY
    custom: "something went terrible in general", // FOR PRODUCTION
  });
});
