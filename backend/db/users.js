var c = require('crypto-random-string');
var sha256 = require('sha256');

var salt = c(10);
var sampleUser = {
  'id': 0,
  'salt': salt,
  'username': 'alex',
  'password': sha256('foo' + salt)
};

exports.findByUsername = function(username, cb) {
  if (username != 'alex') { return cb("error!") };
  return cb(null, sampleUser);
}

exports.findById = function(id, cb) {
  return cb(null, sampleUser);
}

exports.sampleUser = sampleUser;
