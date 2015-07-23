var fs     = require('fs');
var config = {};

exports.load = function (file) {

	//Read as UTF8 so we don't get a buffer. readFileSync because async. doesn't make sense here.
    var cfg;

	try {
		cfg = JSON.parse(fs.readFileSync(file, { encoding: 'utf8'}));
	} catch (e) {
		throw new Error('Invalid configuration file. Not existing or properly formatted? Error:' + e.message);
	}

	config = cfg;

};

exports.get = function (key) {

	//Give the entire object if key is null.
	if (key === undefined) {
		return config;
	}

	//Split the key by dot, because it takes dot notation
	var keys = key.split('.');

	//So that we don't lose our config.
	var cfgv = config;

	keys.forEach(function (value) {

		cfgv = cfgv[value];

		//Throw an error if we run into anything undefined.
		if (cfgv === undefined) {
			throw new Error('Configuration value could not be found:', key);
		}

	});

	return cfgv;

}