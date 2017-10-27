var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../db').users.User;

/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect('/');
});

router.post('/', function(req, res) {
  var body = req.body;
  var user = new User(body.name, body.age, body.email, body.password);
  user.create().then(function(f) { 
    res.json({
      'user': user,
      'password': undefined
    }); 
  });
});


module.exports = router;
