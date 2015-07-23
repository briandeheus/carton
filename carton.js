var async = require('async');

var setupFunctions = [];
var initFunctions  = [];

//Always load the configuration module.
exports.cfg    = require('./cfg');
exports.appDir = '';

exports.add = function (module) {

	if (!module.name) {
		throw new Error('Name is not set for module');
	}

	//Check if the modules are not using any reserved names.
	if (module.name === 'add') {
		throw new Error('Module name "use" is a reserved name');
	}

	if (module.name === 'setup') {
		throw new Error('Module name "setup" is a reserved name');
	}

	if (module.name === 'cfg') {
		throw new Error('Module name "cfg" is a reserved name');
	}

	//And make sure we don't already have a module by the same name.
	if (exports[module.name]) {
		throw new Error('Conflicting module name for ' + module.name);
	}

	//Check if it has an init function...
	if (module.init) {
		initFunctions.push(module.init);
	}

	//... or a setup function.
	if (module.setup) {
		setupFunctions.push(module.setup);
	}

	//Finally expose it by it's name.
	exports[module.name] = module;

};

exports.setup = function (cb) {

	//First go through the initialization functions.
	async.eachSeries(initFunctions, function (f, next) {

		f(next);

	}, function (error) {

		if (error) {
			return cb(error);
		}

		//Then move on to the setup functions.
		async.eachSeries(setupFunctions, function (f, next) {

			f(next);

		}, cb);

	});

};

exports.setAppDir = function (dir) {
	exports.appDir = dir;
};