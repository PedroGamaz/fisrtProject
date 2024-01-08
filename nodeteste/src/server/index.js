require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DB_URL,
});

client.connect();

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send({ message: "funcionando get" }));

app.listen(port);
console.log("server on");
