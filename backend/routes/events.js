var express = require('express');
var router = express.Router();
var Event = require('../db').events.Event;

var dummyEvents = [
  {'id': 0, 'name': 'Dummy Event 1', 'date': 'Oct. 22nd 2017', 'createdBy': 'Alex'},
  {'id': 1, 'name': 'Dummy Event 2', 'date': 'Oct. 23nd 2017', 'createdBy': 'Tighe'}
];

router.get('/', function(req, res) {
  res.json(dummyEvents);
});

router.post('/', function(req, res) {
  let body = req.body;
  let event = new Event(2, body.partnerId, body.name, 
      body.description, body.startDate, body.endDate, body.recurring);

  return event.create()
    .then(event.toPublicResponse())
    .then(res.json.bind(res))
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
