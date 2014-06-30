module.exports = function() {
  // Any files in this directory will be `require()`'ed when the application
  // starts, and the exported function will be invoked with a `this` context of
  // the application itself.  Initializers are used to connect to databases and
  // message queues, and configure sub-systems such as authentication.

  // Async initializers are declared by exporting `function(done) { /*...*/ }`.
  // `done` is a callback which must be invoked when the initializer is
  // finished.  Initializers are invoked sequentially, ensuring that the
  // previous one has completed before the next one executes.
	var mongoose = require('mongoose');
	console.log('------ connecting to ' + 'mongodb://192.168.79.130:27017/Blog');
	mongoose.connect('mongodb://192.168.79.130:27017/Blog');
	var mongooseTypes = require("mongoose-types");
	mongooseTypes.loadTypes(mongoose);
	mongoose.connection.on('error', function(err) {
		console.log('-------------------- MONGOOSE DB CONNECT ERROR: ' + err);
	});
}
