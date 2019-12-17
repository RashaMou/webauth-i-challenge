module.exports = (req, res, next) => {
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
};
