var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Test GET /', function() {
  it('should return a simple hello world message', function(done) {
    chai.request(server).get('/').end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.equal('hello there!');
    });
    done();
  });
});
