const http = require("http");

const port = 8080;

// criando server
const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>home page</h1>");
  }

//   req = requisição ou pedido direcionando conteudo atravéz da url
  if (req.url === "/users") {
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

    // enviando conteudo pra o navegador com res writehead 200 pra nao dar erro e content type para especificar o tipo da informação s é um html, json etc
    res.writeHead(200, { "Content-Type": "application/json" });
    // transformando json (objeto) em json preparado para navegador
    res.end(JSON.stringify(users));
  }
});

server.listen(port, () => console.log(`Rodando na porta ${port}!`));
