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
  const {title, url, techs} = request.body; 
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);
  
  return response.json(repository); 

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if( repositoryIndex < 0 ){
      return response.status(400).json('repository not found');
  }
  const repository = repositories[repositoryIndex];
  //alterando somente os 3 valores
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);


});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if( repositoryIndex < 0 ){
      return res.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);
  return res.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if( repositoryIndex < 0 ){
      return response.status(400).json({error: 'não existe esse carai'});
  }
  let like = repositories[repositoryIndex].likes + 1;
  repositories[repositoryIndex].likes = like;
  return response.status(200).json({likes: like});
});

module.exports = app;
