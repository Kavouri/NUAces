// External Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var Strategy = require('passport-local').Strategy;
var sha256 = require('sha256');
var expressSession = require('express-session');
var db = require('./db');

// Middleware
var { ensureAuthenticated, ensureAdmin } = require('./middleware').auth;

// Routes
var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var partners = require('./routes/partners');
var auth = require('./routes/auth');

var app = express();

// Config must be defined before routes
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'TODO',
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requestedw-With, Content-Type, Accept");
  next();
})


// Linking routes to route handlers
app.use('/user', users, ensureAuthenticated);
app.use('/event', events, ensureAuthenticated);
app.use('/partner', partners);
app.use('/login', auth);
app.use('/', index, ensureAuthenticated);

passport.use(new Strategy(
  { usernameField: 'email' },
  function(email, password, done) {
    var user = new db.users.User(email, password);
      return user.verifyPassword()
        .then((user) => done(null, user))
        .catch((err) => done(null, false));
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

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
  res.send(res.locals.error);
});

app.get('*', function(req, res) { res.send('Unimplemented Endpoint') });
module.exports = app;
