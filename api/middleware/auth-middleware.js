const db = require("../data/dbConfig");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

function checkValidUser(req, res, next) {
  const { username, password } = req.body;
  const action = req.url;

  if (action === "/register" && (!username || !password)) {
    res.status(422).json({ message: "Username and password are required" });
  } else if (action === "/login" && (!username || !password)) {
    res.status(422).json({ message: "Username and password are required" });
  } else if (typeof password !== "string") {
    res.status(422).json({ message: "Password must be a string" });
  } else {
    next();
  }
}

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const config = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, config);
}

async function checkUsernameIsAvailable(req, res, next) {
  const username = req.body.username;
  const user = await db("users").where("username", username).first();
  if (user) {
    res.status(422).json({ message: "This username is already taken" });
  } else {
    next();
  }
}

module.exports = {
  checkValidUser,
  buildToken,
  checkUsernameIsAvailable,
};
