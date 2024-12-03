const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json()); // Middleware para analisar JSON

// Rota de cadastro de usuário
router.post('/register', async (req, res) => {
    const { nome, email, senha, cpf, nascimento, sexo, estado, celular } = req.body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha || !cpf || !nascimento || !estado || !celular) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
    }

    try {
        // Verificar se o usuário já existe (baseado no email ou CPF, ambos devem ser únicos)
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [{ email }, { cpf }],
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já cadastrado com este email ou CPF." });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar um novo usuário no banco de dados
        const newUser = await prisma.users.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
                cpf,
                nascimento: new Date(nascimento), // Converter para formato de data
                sexo: sexo || null, // Campo opcional (pode ser nulo)
                estado,
                celular,
                is_admin: false, // Garantir que o valor padrão de is_admin seja false
            },
        });

        return res.status(201).json({ message: "Cadastro bem-sucedido!", usuario: newUser });
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
            return res.status(401).json({ message: "Usuário não encontrado." }); // Usando 401 para falha de autenticação
        }

        // Verificar a senha
        let validPassword = false;
 
        validPassword = await bcrypt.compare(senha, user.senha);  // Para outros usuários, verifica com bcrypt
        
        if (!validPassword) {
            return res.status(401).json({ message: "Senha incorreta." }); // 401 também para falha de senha
        }

        // Se a senha estiver correta, direcionar o usuário para a página correspondente
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
