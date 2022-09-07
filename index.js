const { request, response } = require("express");
const express = require("express");
const cors = require("cors");

const App = express();
App.use(express.static("build"))
App.use(cors());
App.use(express.json());

App.use((request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("------------------");
  response.somethis = "Hello Subarna";
  next();
});
// next();
//ya next garena vane yo app yei freexe hunxa....so to avoid we use next,
// yedi aru middleware xa vane tyo execute garr navaye
// request k aaxa like post/get tesma ja vaneko ho

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-1-17T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: true,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: false,
  },
];

App.get("/", (request, response) => {
  // response.send("<h1>Hello World There</h1>");
  response.send(response.somethis);
});

App.get("/notes", (request, response) => {
  response.send(notes);
});

App.get("/notes/:id", (request, response) => {
  const currentID = Number(request.params.id);
  const thisNote = notes.find((note) => note.id === currentID);
  if (thisNote) response.json(thisNote);
  else
    response
      .status(404)
      .json({ error: 404, message: `There is no note with ${currentID}` });
  // response.send(thisNote);
});

App.delete("/notes/:id", (request, response) => {
  const currentID = Number(request.params.id);
  notes = notes.filter((note) => note.id !== currentID);
  response.status(204).end();
});

App.post("/notes/", (request, response) => {
  let myIncomingData = request.body;
  myIncomingData.id = notes.length + 1;
  notes.push(myIncomingData);
  console.log(myIncomingData);
  response.status(201).json(myIncomingData);
});
///this code handles the error of the request url is invalid.
//  After executing all the middle ware and request url
App.use((request, response, next) => {
  response.status(404).send("<h1>No routes found for this request</h1>");
});

const PORT = process.env.PORT || "3001";

App.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
