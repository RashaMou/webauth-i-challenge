const express = require("express");
const helmet = require("helmet");
const server = express();
const apiRouter = require("./api-router");
server.use(express.json());
server.use(helmet());
server.use("/api", apiRouter);

module.exports = server;
