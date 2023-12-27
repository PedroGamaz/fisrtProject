// const meuArquivo = require('./meuArquivo.js');

// importando um módulo já criado para um código

const { Person } = require("./person.js");

// require('./module/path.js')
// require("./module/fs.js");

// require("./module/http.js");
require("./module/express.js");

const person = new Person("Pedro");
