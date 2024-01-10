// const meuArquivo = require('./meuArquivo.js');

// importando um módulo já criado para um código

// const { Person } = require("./person.js");

require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Funcionando!" }));

app.listen(port);
console.log("API funcionando!");

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
  const task = await db.postTasks();
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
