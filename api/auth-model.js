const db = require("../data/db-config");

module.exports = {
  register,
  getUsers
};

function getUsers() {
  return db("users").select("id", "username");
}

function register(userData) {
  return db("users").insert(user, "id");
  return "Registration successful!";
}
