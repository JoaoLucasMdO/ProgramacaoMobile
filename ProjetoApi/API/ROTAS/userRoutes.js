const express = require("express");
const router = express.Router();
// Armazenamento em memória (simulando um banco de dados)
let users = [];
var criarId = 1;

// Rota para cadastro de usuário
router.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Senha:", senha);
  // Validando os dados
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios." });
  }
  // Criar novo usuário e adicionar ao array
  const newUser = { id: criarId, nome, email, senha };
  users.push(newUser);
  criarId++;

  res
    .status(201)
    .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
});

// Rota para consulta de usuários (retornar todos os usuários cadastrados)
router.get("/consulta", (req, res) => {
  if (users.length === 0) {
    return res.status(404).json({ message: "Nenhum usuário encontrado." });
  }

  res.status(200).json(users); // Retornando o array de usuários
});

// Rota para consultar um único usuário pelo ID
router.get("/consulta/:id", (req, res) => {
  const { id } = req.params;

  // Encontrar o usuário pelo ID
  const user = users.find((user) => user.id === parseInt(id));

  // Verificar se o usuário existe
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  res.status(200).json(user); // Retorna o usuário encontrado
});

//Rota para atualizar um usuário pelo ID
router.put("/atualizacao/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  //Encontrar o índice do usuário pelo ID
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  //Verificar se o usuário existe
  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  //Validando os dados
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios!" });
  }
  //Atualizar o usuário
  users[userIndex] = { id: parseInt(id), nome, email, senha };
  res.status(200).json({
    message: "Usuário atualizado com sucesso!",
    user: users[userIndex],
  });
});

//Rota para deletar um usuário pelo ID
router.delete("/deletar/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(400).json({ message: "Usuário não encontrado." });
  }
  //Remover o usuário do array
  users.splice(userIndex, 1);
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

module.exports = router;
