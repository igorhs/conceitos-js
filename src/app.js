const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository){

    return response.status(400).json({error: 'Repository was not found.'});
  }

  const update = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[repository] = update;

  return response.json(update);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository){

    return response.status(400).json({error: 'Repository was not found.'});
  }

  repositories.splice(repository);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository){
    return response.status(400).send()
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
