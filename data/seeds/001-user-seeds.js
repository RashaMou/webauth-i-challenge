exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "Mo", password: "123456" },
        { id: 2, username: "Munky", password: "789456" },
        { id: 3, username: "Cassius", password: "321654" }
      ]);
    });
};
