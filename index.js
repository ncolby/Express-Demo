const express = require("express");

const server = express();

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server Listening.......");
});

server.get("/nikko", (req, res) => {
  res.send("<h1>Hi Nikko! </h1>");
});
