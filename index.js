const express = require("express");

const server = express();
// adding stuff to make sure issue is fixed
const PORT = process.env.PORT || 3000;
// not working?
server.listen(PORT, () => {
  console.log("Server Listening.......");
});
// checking for push to heroku
server.get("/nikko", (req, res) => {
  res.send("<h1>Hi Nikko! </h1>");
});
