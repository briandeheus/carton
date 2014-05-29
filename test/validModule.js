exports.name = 'valid';
exports.beenSetup = false;
exports.beenInitd = false;

exports.setup = function (cb) {

	exports.beenSetup = true;
	cb();

};

exports.init = function (cb) {

	exports.beenInitd = true;
	cb();

};