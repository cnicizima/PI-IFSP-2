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
        reviews: reviews.toString(),
        descricao,
        preco: parseFloat(preco),
      },
    });
    res.status(201).json(destino);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar destino' });
  }
});


// **Rota GET para buscar todos os destinos no banco SQLITE**
router.get('/destinos', async (req, res) => {
  try {
    const destinos = await prisma.destinos.findMany();
    res.status(200).json(destinos);
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    res.status(500).json({ error: 'Erro ao buscar destinos' });
  }
});

module.exports = router;
