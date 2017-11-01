var express = require('express');
var router = express.Router();
var passport = require('passport');
var { findByEmail, verifyPasswordMatches } = require('../db').users;

router.get('/', function(req, res, next) {
  res.json("hello there, this is our login endpoint!");
});


router.post('/', passport.authenticate('local'),
  function(req, res, next) {
    res.send('good!');
  }
);

module.exports = router;
