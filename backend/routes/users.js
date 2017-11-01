var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../db').users.User;
var Student = require('../db').students.Student;

/* GET users listing. */
router.get('/', function(req, res) {

});

router.post('/', function(req, res) {
  var body = req.body;
  console.log(req.body);
  var user = new User(body.email, body.password, body.name, body.dob);
  var student = new Student(user, body.address, body.school);
  user.create()
    .then(student.create)
    .then(student.toPublicResponse)
    .then(res.json.bind(res))
    .catch(err => { res.status(400).send(err.message) }); 
});

module.exports = router;
