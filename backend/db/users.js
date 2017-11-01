var utils = require('../utils');
var query = require('./connect').query;
var sha256 = require('sha256');

class User {

  constructor(email, password, name, birthday, salt, id) {
    this.name = name;
    this.birthday = birthday;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.confirmed = false;
    this.id = id;

    // Bind methods
    this.getInsertQuery = this.getInsertQuery.bind(this);
    this.toPublicResponse = this.toPublicResponse.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.hashAndCompare = this.hashAndCompare.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.setUserId = this.setUserId.bind(this);
  } 

  create() {
    return findByEmail(this.email)
      .then(this.verifyUserDoesNotExist) // Is tap only a bluebird thing??
      .then(this.validateFields)
      .then(this.getInsertQuery)
      .then(query)
      .then(this.setUserId)
      .then(this.toPublicResponse)
  }

  destroy() {
    //TODO
  }

  setUserId(queryResult) {
    this.id = queryResult.insertId;
    return queryResult;
  }

  getInsertQuery() {
    var salt = this.salt || utils.generateSalt();
    var hashedPassword = utils.hashPassword(this.password, salt);
    console.log(this.birthday);
    var insertQuery = `INSERT INTO users 
      (name, email, birthday, password, salt, isAdmin, confirmed) 
      VALUES ('${this.name}', '${this.email}', '${this.birthday}', 
              '${hashedPassword}', '${salt}', ${0}, ${0})`;
    return insertQuery;
  }

  hashAndCompare(rows) { 
    var hashedPassword = rows[0].password;
    var salt = rows[0].salt;
    if (sha256(this.password + salt) != hashedPassword) {
      throw new Error('invalid password');
    }
    return rows;
  }

  toPublicResponse() {
    return {
      'id': this.id,
      'email': this.email,
      'name': this.name,
      'confirmed': this.confirmed
    }
  }

  validateFields() {
    // TODO validate birthday
    var validFields = this.name && this.name.length < 256 ;
    var validEmail = utils.validateEmail(this.email); 
    var passwordValid =  utils.validatePassword(this.password);
    if (!(validFields && validEmail && passwordValid)) {
      throw new Error('failed to validate fields');
    }
    return true;
  }

  isValid() {
     return this.validateFields();
  }

  verifyUserDoesNotExist(queryResult) {
    if (queryResult.length == 0) return true;
    throw new Error('Email already in use');
  }

  verifyPassword() {
    return findByEmail(this.email)
      .then(this.hashAndCompare)
      .then(toUser);
  }

}

function toUser(rows) {
  var user = rows[0];
  user = new User(user.email, user.password, user.name, 
      user.birthday, user.salt, user.userId);
  return user;
}

findByEmail = function(email) {
  return query(`SELECT * FROM users WHERE email="${email}"`);
}

exports.findByEmail = findByEmail;
exports.User = User;
exports.toUser = toUser;
