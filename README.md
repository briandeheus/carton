Carton
=========

Manage your library files throughout your codebase without worrying about anything except maybe some trivial things like making sure your code works.

##Example

Boostrappin' your application in, for example, `index.js`;

```javascript
var carton = require('carton');

carton.add(require('./awesomeModule'));
carton.add(require('./magicalModule'));
carton.add(require('./coolModule'));
carton.add(require('./whateverModule'));

carton.setup(function() {
    
	carton.cool.beans();
	
});

```

Inside of `coolModule.js`

```javascript
//Your module needs to have a name for Carton to recognize it.
exports.name = 'cool';
//Carton first calls all init functions. You should not use modules loaded with Carton at this point.
exports.init = function (cb) {
    console.log('I am called first!');
    cb();
};

//Carton call setup once all modules have been initialized. You can now access all carton modules.
exports.setup = function (cb) {
    console.log('I am called after all other modules have been setup.');
    cb();
};

exports.beans = function () {
    console.log('Okey Dokey Artichoke');
};

```