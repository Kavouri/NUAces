var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', 
  passport.authenticate('local'),
  function(req, res) {
    console.log('here');
    res.redirect('/');
});


module.exports = router;
