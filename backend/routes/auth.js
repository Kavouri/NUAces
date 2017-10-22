var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  res.json("hello there, this is our login endpoint!");
});

module.exports = router;
