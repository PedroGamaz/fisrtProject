// const meuArquivo = require('./meuArquivo.js');

// importando um módulo já criado para um código

// const { Person } = require("./person.js");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/connect.js");

dotenv.config();

connectToDatabase();

// require('./module/path.js')
// require("./module/fs.js");
// require("./module/http.js");
// require("./module/express.js");

// const person = new Person("Pedro");
