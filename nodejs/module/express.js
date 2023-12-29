const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();

// app.get no users pegando a list de usuários do front no caso
app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1>Hello World!</h1>");
});

app.get("/users", (req, res) => {
  const users = [
    {
      name: "Pedro Gama",
      email: "Pedro@gama.com",
    },
    {
      name: "Henrique Mariano",
      email: "Henrique@Mariano.com",
    },
  ];

  res.status(200).json(users);
});

// app.post no mesmo users ele cria o usuario no banco
app.post("/users", (req, res) => {
  const user = UserModel.create(req.body);

  res.status(201).json(user);
});
// instalar postman

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
