var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../app');
var events = require('../../routes/events');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Test GET /events', function() {
  it('should return two dummy events', function(done) {
    chai.request(server).get('/').end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.equal(events.dummyEvents);
    });
    done();
  });
});
