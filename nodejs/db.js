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
//buscando todas as tasks
async function selectTasks() {
  const client = await connect();
  const res = await client.query("SELECT * FROM task ORDER BY id DESC");
  return res.rows;
}

// criando task
async function postTasks(title, description, observation) {
  const client = await connect();
  const res = await client.query(
    `INSERT INTO task (title, description, observation, deadline) VALUES ('${title}', '${description}', '${observation}', 'NOW()') RETURNING id`
  );
  let id = res.rows[0].id;
  const selectId = await client.query(`SELECT * FROM task WHERE id = ${id}`);
  let resId = selectId.rows[0];
  return resId;
}

//connection pool conceito de conexão com o banco de dados

// buscando task por id no banco
async function selectTask(taskid) {
  const client = await connect();
  const res = await client.query(`SELECT * FROM task WHERE id = ${taskid}`);
  return res.rows;
}

// atualizando a task by id
async function putTasks(
  id,
  titleEditValue,
  descriptionEditValue,
  observationEditValue
) {
  const sql =
    `UPDATE task 
  SET title = '` +
    titleEditValue +
    `', 
  description = '${descriptionEditValue}', 
  observation = '${observationEditValue}' 
  WHERE id = ${id}
  RETURNING *`;
  console.log(sql);
  const client = await connect();
  const res = await client.query(sql);
  return res.rows;
}

// deletando tesk by id da rota
async function deleteTask(id) {
  const client = await connect();
  return await client.query(`DELETE FROM task WHERE id = ${id}`);
}

// CRUD USERS

async function selectUsers() {
  const user = await connect();
  const res = await user.query(`SELECT * FROM usuarios`);
  return res.rows;
}

async function selectUser(userid) {
  const user = await connect();
  const res = await user.query(`SELECT * FROM usuarios WHERE id = ${userid}`);
  return res.rows;
}

async function postUser() {
  const user = await connect();
  const res = await user.query(
    `INSERT INTO usuarios (username, senha) VALUES ('Henqiue', '123456asd')`
  );
  return res.rows;
}

async function putUser(userid) {
  const user = await connect();
  const res = await user.query(
    `UPDATE usuarios SET username = 'mariano' WHERE id = ${userid}`
  );
  return res.rows;
}

async function deleteUser(userid) {
  const user = await connect();
  return await user.query(`DELETE FROM usuarios WHERE id = ${userid}`);
}
module.exports = {
  selectTasks,
  selectTask,
  postTasks,
  putTasks,
  deleteTask,
  selectUsers,
  selectUser,
  postUser,
  putUser,
  deleteUser,
};
