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

//Carton first calls all init functions. 
//You should not use modules loaded with Carton at this point. 
//This function is not required.
exports.init = function (cb) {
    console.log('I am called first!');
    cb();
};

//Carton call setup once all modules have been initialized.
//You can now access all carton modules. 
//This function is not required.
exports.setup = function (cb) {
    console.log('I am called after all other modules have been intialized.');
    cb();
};

exports.beans = function () {
    console.log('Okey Dokey Artichoke');
};

```

##Configuration files
Although Carton is designed to provide as little functionality out of the box as possible, it has one module to load configuration files. Configuration files should be valid JSON. Let's say that this is your configuration file:

```
{
	"foo": "bar",
	"nested": {
		"objects": {
			"are": {
				"cool": "too"
			}
		}
	},
	"array": [
		"this", "is", "an", "array"
	]
}
```
Then you can access your configuration files like this;

```javascript
var assert = require('assert');
var carton = require('carton');
carton.cfg.load('/location/to/your/file.json');

var nestedObjects = carton.cfg.get('nested.objects');
assert.equals(nestedObjects.are.cool, 'too');

var arr = carton.cfg.get('arrays');
assert.equals(arr.length, 4);

var foo = carton.cfg.get('foo');
assert.equals(foo, 'bar');

```
##Appplication directory
Carton has a way to set the app directory so that you can access it via `carton.appDir`.
```
carton.setAppDir('/var/www/carton');
```

##Testing
Run `make test` and watch the magic happen.