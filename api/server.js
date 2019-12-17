const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require("express-session");
const knexSessionStore = require("connect-session-knex")(sessions);
const knex = require("../data/db-config");
const apiRouter = require("./api-router");
const server = express();

const sessionConfiguration = {
  name: "oatmealchocolatechip",
  secret: "of nimh",
  saveUninitialized: true,
  resave: false,
  store: new knexSessionStore({
    knex,
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    tablename: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(sessions(sessionConfiguration));
server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.send("api up and running");
});

module.exports = server;
