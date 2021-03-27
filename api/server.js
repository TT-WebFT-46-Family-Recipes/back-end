const express = require("express");

const server = express();

server.use(express.json());

// check to see what envrironment you are currently in
console.log(process.env.NODE_ENV);

// on Heroku machine, an env variable is called "NODE_ENV" -> "production"

if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  server.use(cors());
}

// our API comes earlier in the pipeline
server.get("/api/hello", (req, res) => {
  res.json({ message: "Hey there!" });
});
