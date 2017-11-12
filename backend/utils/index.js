var pbkdf2 = require('pbkdf2');
var salter = require('crypto-random-string');
var moment = require('moment');

var ITERATION_COUNT = 10000;

exports.validatePassword = function(password) {
  var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return regex.test(password);
}

exports.validateEmail = function(email) {
  if (!email) return false;
  return email.endsWith('@husky.neu.edu') || email.endsWith('@neu.edu');
}

exports.hashPassword = function(plainText, salt) {
  var derivedKey = pbkdf2.pbkdf2Sync(plainText, new Buffer(salt), ITERATION_COUNT, 256, 'sha256').toString('hex');
  return derivedKey;
}

exports.generateSalt = function(plainText) {
 return salter(10); 

}

exports.validateDate = function(date) {
  var date = moment(date);
  if (!date.isValid()) {
    throw new Error('invalid date: ' + date);
  }
  return true;
}

exports.formatDate = function(date) {
  return moment(date).format('YYYY/MM/DD');
}
