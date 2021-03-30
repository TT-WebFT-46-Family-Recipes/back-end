const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const {
  buildToken,
  checkValidUser,
  checkUsernameIsAvailable,
} = require("../middleware/auth-middleware");

const db = require("../data/dbConfig");

router.post(
  "/register",
  checkValidUser,
  checkUsernameIsAvailable,
  async (req, res, next) => {
    const credentials = req.body;
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    try {
      await db("users").insert(credentials);
      const user = await db("users")
        .where("username", credentials.username)
        .first();
      const token = buildToken(user);
      const newUser = {
        user_id: user.user_id,
        username: user.username,
      };
      res
        .status(201)
        .json({ message: `Hello ${newUser.username}!`, token, newUser });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", checkValidUser, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await db("users").where("username", username).first();
    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = buildToken(user);
      res.status(200).json({ message: `Good to see you ${username}!`, token });
    } else {
      res.status(401).json({ message: "Username or password is incorrect" });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  res.status(500).json({
    message: err.message, // DEVELOPMENT ONLY
    stack: err.stack, // DEVELOPMENT ONLY
    custom: "something went terrible in general", // FOR PRODUCTION
  });
});
module.exports = router;
