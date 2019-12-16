const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("./auth-model");

router.get("/users", async (req, res) => {
  const allUsers = await Users.getUsers();
  try {
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("Error retrieiving users");
  }
});

router.post("/register", async (req, res) => {
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

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
