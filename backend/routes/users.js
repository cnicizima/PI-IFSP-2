const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json()); // Middleware para analisar JSON

// Rota de cadastro de usuário
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    try {
        // Verificar se o usuário já existe
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe." });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar um novo usuário no banco de dados, com is_admin como false por padrão
        const newUser = await prisma.users.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
                is_admin: false, // Garantir que o valor padrão de is_admin seja false
            },
        });

        return res.status(201).json({ message: "Cadastro bem-sucedido!" });
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        res.status(500).json({ message: "Erro ao cadastrar o usuário." });
    }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    try {
        // Verificar se o usuário existe
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // Verificar a senha
        let validPassword = false;

        // Se o usuário for o admin, compara a senha diretamente com "senha123"
        if (user.is_admin) {
            validPassword = senha === "senha123";  // Comparação direta para o admin
        } else {
            validPassword = await bcrypt.compare(senha, user.senha);  // Para outros usuários, verifica com bcrypt
        }

        if (!validPassword) {
            return res.status(400).json({ message: "Senha incorreta." });
        }

        // Verificar o campo is_admin
        if (user.is_admin) {
            return res.status(200).json({
                message: "Login bem-sucedido, redirecionando para admin.",
                redirectTo: "admin.html",  // Redirecionar para a página de admin
            });
        } else {
            return res.status(200).json({
                message: "Login bem-sucedido, redirecionando para o carrinho.",
                redirectTo: "carrinho.html",  // Redirecionar para a página do carrinho
            });
        }

    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: "Erro ao realizar login." });
    }
});

// Exportar o router
module.exports = router;
