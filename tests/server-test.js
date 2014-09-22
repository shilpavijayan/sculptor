var startserver  = require('../server').startserver
  , stopserver = require('../server').stopserver
  , port = require('../server').port
  , superagent = require('superagent')
  , assert = require('assert')
  ;

describe('server', function () {
    before(function () {
	startserver();
    });
    describe('homepage', function () {
	it('should respond to GET', function (done) {
	    superagent
	      .get(homepage)
	      .end(function (res) {
		  assert.strictEqual(res.status, 200);
		  done();
	    });
	});
    });
    after(function () {
	stopserver();
    });
});
