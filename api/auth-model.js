const db = require("../data/db-config");

module.exports = {
  register,
  getUsers,
  findById
};

function getUsers() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users").where({ id });
}

function register(userData) {
  return db("users")
    .insert(userData, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
