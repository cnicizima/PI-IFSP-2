const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota para criar um destino
router.post('/destinos', async (req, res) => {
  try {
    const { imagem, nome, avaliacao, reviews, descricao, preco } = req.body;
    const destino = await prisma.destinos.create({
      data: {
        imagem,
        nome,
        avaliacao,
        reviews,
        descricao,
        preco,
      },
    });
    res.status(201).json(destino);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar destino' });
  }
});

module.exports = router;
