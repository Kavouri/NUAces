var utils = require('../utils');
var query = require('./connect').query;
var sha256 = require('sha256');

class User {

  constructor(name, age, email, password, salt) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.confirmed = false;
  } 

  create() {
    var salt = utils.generateSalt();
    var hashedPassword = utils.hashPassword(this.password, salt);
    return query(`INSERT INTO users (name, email, age, password, salt, confirmed) VALUES ('${this.name}', '${this.email}', ${this.age}, '${hashedPassword}', '${salt}', ${0})`);
  }

  destroy() {
    //TODO
  }

  validateFields() {
    var validFields = this.name.length < 256 && this.age > 0;
    var validEmail = utils.validateEmail(this.email); 
    var passwordValid =  utils.validatePassword(this.password);
    return validFields && validEmail && passwordValid;
  }

  isValid() {
     return this.validateFields();
  }
}

var salt = utils.generateSalt();
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

exports.User = User;
