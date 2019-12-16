// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite3"
    },
    migrations: {
      directory: "./data/migrations" // will be created automatically
    },
    seeds: {
      directory: "./data/seeds" // also created automatically
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
