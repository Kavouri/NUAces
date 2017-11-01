var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var mysql = require('mysql');
var sha256 = require('sha256');

// stub mysql require
var mysqlStub = sinon.stub(mysql, 'createConnection').returns({
  connect: function() { },
  query: function(query, cb) { }
});

// require our datbaase connection using stubbed mysql
var connect = proxyquire('../../db/connect', {
  mysql: mysqlStub
});

// stub query function 
var queryStub = sinon.stub(connect);

var { User, findByEmail, toUser } = proxyquire('../../db/users', {
  '../../db/connect': queryStub
});

chai.use(chaiHttp);

describe('Test User class and helper functions', function() {
  var user;
  beforeEach(function() {
    user = new User('email', 'password', 'name', 0, 'foo', 0);
    queryStub.query.reset();
  });

  after(function() { queryStub.query.reset() });

  it('should have all the correct fields when an object is created', function(done) {
    expect(user.email).be.equal('email'); 
    expect(user.password).be.equal('password'); 
    expect(user.name).be.equal('name');
    expect(user.age).be.equal(0); 
    expect(user.salt).be.equal('foo'); 
    expect(user.id).be.equal(0); 
    done();
  });

  it('should create a user and return a public response', function(done) {
    var stubs = [
      sinon.stub(user, 'verifyUserDoesNotExist'), 
      sinon.stub(user, 'validateFields'),
      sinon.stub(user, 'getInsertQuery'), 
      sinon.stub(user, 'toPublicResponse').returns('public response')
    ];
    queryStub.query.resolves('foo');
    stubs.map(stub => stub.resolves('foo'));
    user.create().then(_ => stubs.map(stub => sinon.assert.calledOnce(stub)));
    stubs.map(stub => stub.restore());
    done();
  });

  it('should return an insert query based off the object fields', function(done) {
    var hashedPassword = sha256(user.password + 'foo');
    var insertQuery = `INSERT INTO users 
      (name, email, age, password, salt, confirmed) 
      VALUES ('${user.name}', '${user.email}', ${user.age}, 
              '${hashedPassword}', 'foo', ${0})`;
    expect(user.getInsertQuery('foo')).to.equal(insertQuery);
    done()
  });

  it('should return true if the query result password matches the users hashed password', function(done) {
    var err = 'invalid password';
    var func = () => user.hashAndCompare([{password: 'bad value'}]);
    expect(func).to.throw(err);
    done();
  });

  it('should return true if the query result password matches the users hashed password', function(done) {
    var row = {password: sha256('password' + 'foo'), salt: 'foo'};
    var func = () => user.hashAndCompare([row]);
    expect(func).not.to.throw();
    done();
  });

  it('should return an object with id, email, name and confrimed keys when toPublicResponse is called', function(done) {
    var row = {insertId: 0};
    expect(Object.keys(user.toPublicResponse(row)).length).to.equal(4);
    done();
  });

  it('should return true when validateFields is called on a valid user object', function(done) {
    var validUser = new User('kavourias@husky.neu.edu', 'Password123', 'alexander', 22);
    expect(validUser.validateFields()).to.equal(true);
    done();
  });

  it('should throw an error when validateFields is called on an invalid user object', function(done) {
    expect(user.validateFields).to.throw('failed to validate fields');
    done();
  });

  it('should throw an error if verifyUserDoesNotExist is called with a nonempty queryset', function(done) {
    var func = function() { user.verifyUserDoesNotExist([{}]) };
    expect(func).to.throw('Email already in use');    
    done();
  });

  it('should return true if verifyUserDoesNotExist is called with an empty queryset', function(done) {
    expect(user.verifyUserDoesNotExist([])).to.be.equal(true);
    done();
  });
});

describe('Test find by email', function() {
  it('should call the query function with an insert query', function(done) {
    var selectQuery = 'SELECT * FROM users WHERE email="alex"';
    findByEmail("alex");
    sinon.assert.calledOnce(queryStub.query);
    queryStub.query.calledWith(selectQuery); 
    done();
  });

  after(function() {
    queryStub.query.reset();
  });
});

describe('Test toUser helper function', function() {
  it('should return a user object created from the provided query result', function(done) {
    var user = toUser([{email: "foo", password: "bar"}]);
    expect(user).to.be.a('object');
    expect(user.email).to.be.equal('foo');
    expect(user.password).to.equal('bar');
    done();
  });
});


