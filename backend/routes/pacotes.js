var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/api/data', async (req, res) => {
  res.sendFile(path.join(__dirname, '../data/db.json'));
});


module.exports = router;
