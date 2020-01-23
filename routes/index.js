var express = require('express');
var repo = require('../repo');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const infos = await repo.getInfos();
  res.json(infos);
});

module.exports = router;
