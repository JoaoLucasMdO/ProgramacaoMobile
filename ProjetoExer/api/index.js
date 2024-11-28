const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./ROTAS/taskRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use("/api", taskRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
