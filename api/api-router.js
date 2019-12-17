const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("./auth-model");

router.get("/users", restricted, async (req, res) => {
  const allUsers = await Users.getUsers();
  try {
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("Error retrieiving users");
  }
});

router.post("/register", validateRegistration, async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  const newUser = await Users.register(user);
  try {
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const user = await Users.findBy({ username }).first();
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (error) {
    res.status(500).json("Error!");
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message: "Error logging out"
        });
      } else res.status(200).json({ message: "logged out" });
    });
  } else res.status(200).end();
});

// Authorization middleware
async function restricted(req, res, next) {
  // const { username, password } = req.headers;
  // const user = await Users.findBy({ username }).first();
  // if (username && password) {
  //   try {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       next();
  //     } else {
  //       res.status(401).json({ message: "Invalid Credentials" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Unexpected error" });
  //   }
  // } else res.status(400).json({ message: "No credentials provided" });
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

// Registration Middleware

async function validateRegistration(req, res, next) {
  const { username, password } = req.body;
  const user = await Users.findBy({ username }).first();
  if (!username || !password) {
    res.status(400).json("Please provide a username and password");
  } else if (user.username !== username) {
    next();
  } else {
    res.status(400).json("That username already exists. Please try another");
  }
}

module.exports = router;
