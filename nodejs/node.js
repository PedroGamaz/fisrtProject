// const meuArquivo = require('./meuArquivo.js');

// importando um módulo já criado para um código

// const { Person } = require("./person.js");

require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.json({ message: "Funcionando!" }));

app.listen(port);
console.log("API funcionando!");

// CRUD TASK

app.get("/task", async (req, res) => {
  const tasks = await db.selectTasks();
  res.json(tasks);
  console.log("busca de tasks");
});

app.get("/task/:taskid", async (req, res) => {
  const customer = await db.selectTask(req.params.taskid);
  res.json(customer);
  console.log("busca de tasks by id");
});

app.post("/task", async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const observation = req.body.observation;
  const task = await db.postTasks(title, description, observation);
  console.log("task criada!");
  res.status(200).json({ task });
});

app.put("/task", async (req, res) => {
  // console.log(req.body);
  let { id,titleEditValue, descriptionEditValue, observationEditValue } = req.body

  // let id = req.body.id;
  // let titleEditValue = req.body.titleEditValue;
  // let descriptionEditValue = req.body.descriptionEditValue;
  // let observationEditValue = req.body.observationEditValue;
  const task = await db.putTasks(id, titleEditValue, descriptionEditValue, observationEditValue);
  res.status(200).json( task );
  console.log("update task");
});

app.delete("/task", async (req, res) => {
  const id = req.body.id;
  await db.deleteTask(id);
  res.sendStatus(204);
  console.log("delete task");
});

// CRUD USER

app.get("/user", async (req, res) => {
  const user = await db.selectUsers();
  res.json(user);
  console.log("usuários buscados");
});

app.get("/user/:userid", async (req, res) => {
  const user = await db.selectUser(req.params.userid);
  res.json(user);
  console.log("usuário buscado by id");
});

app.post("/user", async (req, res) => {
  const user = await db.postUser();
  res.json(user);
  console.log("Usuario criado");
});

app.put("/user/:userid", async (req, res) => {
  const user = await db.putUser(req.params.userid);
  res.json(user);
  console.log("usuario atualizado!");
});

app.delete("/user/:userid", async (req, res) => {
  await db.deleteUser(req.params.userid);
  res.sendStatus(204);
  console.log("usuario deletado!");
});

// app.get("/task/:taskid", async (req, res) => {
//     await db.deleteCustomer(req.params.taskid);
//     res.sendStatus(204);
//     console.log('deletado')
//   });
// const connectToDatabase = require("./src/database/connect.js");

// dotenv.config();

// connectToDatabase();

// require('./module/path.js')
// require("./module/fs.js");
// require("./module/http.js");

// require("./module/express.js");

// const person = new Person("Pedro");
