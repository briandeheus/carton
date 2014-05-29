var carton  = require('../carton');
var assert  = require('assert');

describe('Loading a valid module', function () {

	it('Adds a module', function () {
		carton.add(require('./validModule'));
	});

	it('Sets up carton', function (done) {

		carton.setup(function() {
			done();
		});

	});

	it('Checks if the module has been initialized', function () {
		assert(carton.valid.beenInitd);
	});

	it('Checks if the module has been setup', function () {
		assert(carton.valid.beenSetup);
	});

});

describe('Loading an invalid module', function () {

	it('Can\'t add an invalid module', function () {

		var error;

		try {
			carton.add(require('./invalidModule'));
		} catch (e) {
			error = e;
		}

		assert(error);
		
	});

	
});

