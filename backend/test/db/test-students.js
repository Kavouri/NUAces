var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var mysql = require('mysql');

describe('test Student methods', function() {
  var sandbox = sinon.sandbox.create();
  var User, Student, user, student;

  beforeEach(function() {
    // stub mysql require
    var mysqlStub = sandbox.stub(mysql, 'createConnection').returns({
      connect: function() { },
      query: function(query, cb) { }
    });

    // require our datbaase connection using stubbed mysql
    var connect = proxyquire('../../db/connect', {
        mysql: mysqlStub
    });

    queryStub = sandbox.stub(connect, 'query');

    var users = proxyquire('../../db/users', {
      '../../db/connect': { query: queryStub }
    });

    var students = proxyquire('../../db/students', {
       '../../db/connect': { query: queryStub }
    });
    Student = students.Student;
    User = users.User;
    user = new User('email', 'password', 'name', 0, 'foo', 0);
    student = new Student(user, 'address', 'college');
  });

  afterEach(function() {
    sandbox.restore();
  })

  it('should create an object with these fields when the constructor is called', function(done) {
    expect(student.address).to.equal('address');
    expect(student.college).to.equal('college');
    expect(student.user).to.equal(user);
    done();
  });
});
