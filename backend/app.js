// External Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var Strategy = require('passport-local').Strategy;
var sha256 = require('sha256');
var expressSession = require('express-session');

//Routes
var index = require('./routes/index');
var users = require('./routes/users');

// Database utilities
var db = require('./db');

var app = express();
// Linking routes to route handlers
app.use('/', index);
app.use('/users', users);

passport.use(new Strategy(
  function(username, password, done) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != sha256(password + user.salt)) { 
        console.log('failed to authenticate');
        return done(null, false); 
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSesssion('express-session')({ 
  secret: 'TODO', 
  resave: false, 
  saveUnitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'dev',
  password: 'password',
  database: 'testdb'
});

connection.connect()

module.exports = app;
