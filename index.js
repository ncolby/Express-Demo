const express = require("express");

const server = express();
// adding stuff to make sure issue is fixed
const PORT = 3000;
// not working?
server.listen(PORT, () => {
  console.log("Server Listening.......");
});

server.get("/nikko", (req, res) => {
  res.send("<h1>Hi Nikko! </h1>");
});
