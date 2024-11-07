var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/destinos', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/destinos.html'));
});

router.get('/sobre_nos', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sobre_nos.html'));
});

router.get('/contato', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contato.html'));
});

router.get('/carrinho', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/carrinho.html'));
});



module.exports = router;
