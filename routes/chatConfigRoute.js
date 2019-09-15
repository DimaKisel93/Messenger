const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const serverPath = __dirname.split('\\').slice(0,-1).join('\\');
const configFilePath = path.join(serverPath, '\\config\\db.json');

/* GET cofig listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(serverPath, '\\views\\chatConfig.html'));
});

router.post('/setConfig', function(req, res, next) {
  fs.writeFileSync(configFilePath, JSON.stringify(req.body));
  res.end();
});

router.get('/getConfig', function(req, res, next) {
  let chatConfig = fs.readFileSync(configFilePath);
  res.send(chatConfig);
})

module.exports = router;
