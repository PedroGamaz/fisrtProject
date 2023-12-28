const mongoose = require("mongoose");

const connectToDatabase = async () => {
    mongoose.set("strictQuery", false);
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@projetoteste.cifdddm.mongodb.net/database?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log(
          "Ocorreu um erro ao se conectar com o banco de dados: ",
          error
        );
      }

      return console.log(
        "Conexão ao banco de dados foi realizada com sucesso!"
      );
    }
  );
};


module.exports = connectToDatabase