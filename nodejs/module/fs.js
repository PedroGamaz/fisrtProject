const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "/teste"), (error) => {
  if (error) {
    return console.log("Erro: ", error);
  }

  console.log("pasta criada com sucesso!");
});

// criar um arquivo
fs.writeFile(
  path.join(__dirname, "/teste", "teste.html"),
  "hello node",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log("arquivo criado com sucesso");
    
  }
);

// adicionar algo a um arquivo
fs.appendFile(
  path.join(__dirname, "/teste", "teste.html"),
  "hello world",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log("arquivo modificado com sucesso");
  }
);

// ler arquivo
fs.readFile(
  path.join(__dirname, "/teste", "teste.html"),
  "utf8",
  (error, data) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log(data);
  }
);
