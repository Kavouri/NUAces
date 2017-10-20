var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Blobs', function() {
  it('should return a simple hello world message', function(done) {
    chai.request(server).get('/').end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.equal('hello there!');
    });
    done();
  });
});
