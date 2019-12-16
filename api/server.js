const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("api up and running");
});

server.post("/api/register");

server.post("/api/login");

server.get("/api/users");

module.exports = server;
