var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../db').users.User;
var Student = require('../db').students.Student;

/* GET users listing. */
router.get('/', function(req, res) {
  if (req.user) {
    res.json(req.user.toPublicResponse());
  } else {
    res.status(401).json("not logged in");
  }
});

router.post('/', function(req, res) {
  var body = req.body;
  var user = new User(body.email, body.password, body.name, body.dob);
  var student = new Student(user, body.address, body.school);
  user.create()
    .then(student.create)
    .then(student.toPublicResponse)
    .then(res.json.bind(res))
    .catch(err => { res.status(400).send(err.message) }); 
});

module.exports = router;
