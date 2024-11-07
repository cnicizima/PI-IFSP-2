const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Para analisar corpo das requisições JSON

// Rota de cadastro de usuário
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  try {
    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "Cadastro bem-sucedido!" });
  } catch (error) {
    // Exibir mais detalhes do erro no console
    console.error("Erro ao cadastrar o usuário:", error.message);
    console.error("Stack trace:", error.stack);

    // Retornar erro detalhado para o cliente
    res.status(500).json({
      message: "Erro ao cadastrar o usuário.",
      error: error.message, // Passando mensagem de erro detalhada
      stack: error.stack, // Passando o stack trace para ajudar no diagnóstico
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
