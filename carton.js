var async = require('async');

var setupFunctions = [];
var initFunctions  = [];

exports.cfg = require('./cfg');

exports.add = function (module) {

	if (!module.name) {
		throw new Error('Name is not set for module');
	}

	if (module.name === 'add') {
		throw new Error('Module name "use" is a reserved name');
	}

	if (module.name === 'setup') {
		throw new Error('Module name "setup" is a reserved name');
	}

	if (module.name === 'cfg') {
		throw new Error('Module name "cfg" is a reserved name');
	}

	if (exports[module.name]) {
		throw new Error('Conflicting module name for ' + module.name);
	}

	if (module.init) {
		initFunctions.push(module.init);
	}

	if (module.setup) {
		setupFunctions.push(module.setup);
	}

	exports[module.name] = module;

}

exports.setup = function (cb) {

	async.eachSeries(initFunctions, function (f, next) {

		f(next);

	}, function (error) {

		if (error) {
			return cb(error);
		}

		async.eachSeries(setupFunctions, function (f, next) {

			f(next);

		}, cb);

	});

}

