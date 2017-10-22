var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var users = require('../../db/users');

var sampleUser = users.sampleUser;

chai.use(chaiHttp);


describe('Test find by username', function() {
  it('should return a single dummy user until we create the database', function(done) {
    users.findByUsername("alex", function(err, user) {
      expect(user).be.equal(sampleUser);
    });
    done();
  });
  it('should return an error for any other user', function(done) {
    users.findByUsername("tiggy", function(err, user) {
      expect(user).be.equal(undefined);
      expect(err).not.be.equal(undefined);
    });
    done();
  });
  it('should return a single dummy user', function(done) {
    users.findById(0, function(err, user) {
      expect(user).be.equal(sampleUser);
    });
    done();
  });
  it('should return an error for any other id', function(done) {
    users.findById(0, function(err, user) {
      expect(err).not.be.equal(undefined);
    });
    done();
  });


});
