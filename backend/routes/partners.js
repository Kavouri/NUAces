var express = require('express');
var router = express.Router();
var db = require('../db');

var dummyPartners = [
  {'id': 0, 'name': 'Dummy Partner 1', 'addedBy': 'Joe'},
  {'id': 1, 'name': 'Dummy Partner 1', 'addedBy': 'Pusheen'}
];

router.get('/', function(req, res, next) {
  res.json(dummyPartners);
});

module.exports = router;
