/*var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var mysql = require('mysql');

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
var queryStub;

var { User } = proxyquire('../../db/users', {
  '../../db/connect': { query: queryStub }
});

var { Student } = proxyquire('../../db/students', {
   '../../db/connect': { query: queryStub }
});



describe('test Student methods', function() {
  beforeEach(function() {
    queryStub = sinon.stub(connect, 'query')
  });

  var student;
  var user = new User('email', 'password', 'name', 0, 'foo', 0);
  beforeEach(function() {
    student = new Student(user, 'address', 'college');
  });

  it('should create an object with these fields when the constructor is called', function(done) {
    expect(student.address).to.equal('address');
    expect(student.college).to.equal('college');
    expect(student.user).to.equal(user);
    done();
  });
*/
