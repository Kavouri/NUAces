var sha256 = require('sha256');
var salter = require('crypto-random-string');

exports.validatePassword = function(password) {
  var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return regex.test(password);
}

exports.validateEmail = function(email) {
  return email.endsWith('@husky.neu.edu') || email.endsWith('@neu.edu');
}

exports.hashPassword = function(plainText, salt) {
  return sha256(plainText + salt);
}

exports.generateSalt = function(plainText) {
 return salter(10); 

}
