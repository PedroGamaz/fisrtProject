// const meuArquivo = require('./meuArquivo.js');

// importando um módulo já criado para um código

// const { Person } = require("./person.js");

require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");

const cors = require("cors");
const app = express();

// app.use(express.json());
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
  const task = await db.postTasks(req.params.title);
  res.json(task);
  console.log("task criada");
});

app.put("/task/:taskid", async (req, res) => {
  const task = await db.putTasks(req.params.taskid);
  res.json(task);
  console.log("update task");
});

app.delete("/task/:taskid", async (req, res) => {
  await db.deleteTask(req.params.taskid);
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
