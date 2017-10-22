var express = require('express');
var router = express.Router();
var db = require('../db');

var dummyEvents = [
  {'id': 0, 'name': 'Dummy Event 1', 'date': 'Oct. 22nd 2017', 'createdBy': 'Alex'},
  {'id': 1, 'name': 'Dummy Event 2', 'date': 'Oct. 23nd 2017', 'createdBy': 'Tighe'}
];
   

router.get('/', function(req, res, next) {
  res.json(dummyEvents);
});

module.exports = router;
