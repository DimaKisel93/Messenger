const express = require('express');
const router = express.Router();
const path = require('path');


const serverPath = __dirname.split('\\').slice(0, -1).join('\\')

/* GET home page. */
router.get('/chat', function (req, res) {
  res.sendFile(path.join(serverPath, '\\views\\chat.html'));
});

module.exports = router;
