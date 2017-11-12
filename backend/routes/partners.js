var express = require('express');
var router = express.Router();
var Partner = require('../db').partners.Partner;

var dummyPartners = [
  {'id': 0, 'name': 'Dummy Partner 1', 'addedBy': 'Joe'},
  {'id': 1, 'name': 'Dummy Partner 1', 'addedBy': 'Pusheen'}
];

router.get('/', function(req, res) {
  res.json(dummyPartners);
});

router.post('/', function(req, res) {
  let body = req.body;
  let partner = new Partner(2, body.name,
      body.description, body.address);

  return partner.create()
    .then(partner.toPublicResponse)
    .then(res.json.bind(res))
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
