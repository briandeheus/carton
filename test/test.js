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

describe('Loading a configuration file', function () {

	it('Can load a configuration file', function () {

		carton.cfg.load(__dirname + '/config.json');

	});

	it('Loads a value from the configuration', function () {

		var value = carton.cfg.get('foo');
		assert.equal(value, 'bar');

	});

	it('Loads a deeper value from the configuration', function () {

		var value = carton.cfg.get('this.goes.quite');
		assert.equal(value, 'deep');

	});

	it('Loads a less deeper value to get an object', function () {

		var value = carton.cfg.get('this.goes');
		assert.equal(value.quite, 'deep');

	});

	it('Loads an array', function () {

		var value = carton.cfg.get('arrays');
		assert.equal(value.length, 5);

	});

	it('Gracefully fails when looking up a non existing value', function () {

		var error;

		try {
			var value = carton.cfg.get('non.existing.value');
		} catch (e) {
			error = e;
		}

		assert(error);

	});

});

