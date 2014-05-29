var fs     = require('fs');
var config = {};

exports.load = function (file) {

	var cfg = fs.readFileSync(file, { encoding: 'utf8'});
	try {
		cfg = JSON.parse(cfg);
	} catch (e) {
		throw new Error('Invalid configuration file. Not properly formatted? Error:' + e.message);
	}

	config = cfg;

}

exports.get = function (key) {

	var keys = key.split('.');
	var cfgv = config;

	keys.forEach(function (value) {
		
		cfgv = cfgv[value];

		if (cfgv === undefined) {
			throw new Error('Configuration value could not be found');
		}

	});

	return cfgv;

}