async function connect() {
  if (global.connection) return global.connection.connect();

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.DB_URL,
  });

  //APENAS TESTANDO A CONEXÃO
  const client = await pool.connect();
  console.log("criou o pool de conexões no PostgreSQL");

  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);
  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}

connect();

async function selectCustomers() {
  const client = await connect();
  const res = await client.query("SELECT * FROM task");
  return res.rows;
}

async function postTasks() {
  const client = await connect();
  const res = await client.query(
    "INSERT INTO task (title, description, observation, deadline) VALUES ('consulta', 'ir de carro', 'levar dinheiro', '2024-01-12')"
  );
  return res.rows;
}

//connection pool conceito de conexão com o banco de dados

// buscando task por id no banco
async function selectCustomer(taskid) {
  const client = await connect();
  const res = await client.query("SELECT * FROM task WHERE id=$1", [
    taskid,
  ]);
  return res.rows;
}

async function putTasks(id) {
  const task = await connect();
  const res = await task.query("UPDATE task SET title = 'update' WHERE id = '5';", [id]);
  return res.rows;
}

// função de deletar tarefa pelo id precisa instalar alguma parada
async function deleteCustomer(taskid) {
  const client = await connect();
  return await client.query("DELETE FROM * task WHERE id=$1", [taskid]);
}

module.exports = {
  selectCustomers,
  selectCustomer,
  deleteCustomer,
  postTasks,
  putTasks,
};