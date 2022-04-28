const express = require("express");

const server = express();

// Tell our server how to process different payloads
server.use(express.json());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server Listening.......");
});

// CRUD
// CREATE => POST
// READ => GET
// UPDATE => PUT
// DELETE => DELETE

const destinations = [];

const students = {
  dao: {
    name: "dao",
    interests: ["tacos"],
    location: "sac-town",
  },
  nikko: {
    name: "nikko",
    interests: ["bananas"],
    location: "detroit",
  },
  will: {
    name: "will",
    interests: ["camaro", "wrangler", "bananas"],
    location: "detroit",
  },
};

server.get("/students", (req, res) => {
  const { name, interest, city } = req.query;

  if (name) {
    const student = students[name.toLowerCase()];

    if (student) {
      return res.send(students[name]);
    }

    return res
      .status(404)
      .send({ error: `Student by the name of ${name} not found` });
  }

  let filteredStudents = Object.values(students);

  if (interest) {
    filteredStudents = filteredStudents.filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );
  }

  if (city) {
    filteredStudents = filteredStudents.filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );
  }

  return res.send(filteredStudents);
});

server.get("/students/city/:city", (req, res) => {
  const { city } = req.params;
  if (city) {
    const filteredStudents = Object.values(students).filter(
      (student) => student.location.toLowerCase() === city.toLowerCase()
    );
    return res.send(filteredStudents);
  }
});

server.get("/students/name/:name", (req, res) => {
  const { name } = req.params;
  if (name) {
    const student = students[name.toLowerCase()];
    if (student) {
      return res.send(student);
    }
    return res
      .status(404)
      .send({ error: `Student by the name ${name} not found` });
  }
});

// CREATE => POST
// POST /destinations
server.post("/destinations", (req, res) => {
  // ONLY grab what I need
  const { destination, location, photo, description } = req.body;

  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination AND location are BOTH required" });
  }

  // Create the new object to put in my database
  const newDest = {
    destination,
    location,
    photo: photo && photo.length !== 0 ? photo : "asdfasdf",
    description: description && description.length !== 0 ? description : "",
  };

  destinations.push(newDest);

  res.redirect(303, "/destinations");
});

server.get("/destinations", (req, res) => {
  res.send(destinations);
});
