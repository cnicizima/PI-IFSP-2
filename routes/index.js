var express = require('express');
var router = express.Router();
const path = require('path');


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

router.get('/admin', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});


module.exports = router;
