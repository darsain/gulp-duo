var Duo = require('duo');
var map = require('map-stream');

module.exports = duo;

function duo(options) {
	options = options || {};
	var config = typeof options === 'function' ? options : false;
	var plugins = options.plugins || [];

	delete options.plugins;

	return map(function(file, done) {
		var duo = new Duo(file.cwd);

		if (config) config(duo);
		else {
			// apply options
			for (var name in options) duo[name](options[name]);

			// apply plugins
			for (var i = 0; i < plugins.length; i++) duo.use(plugins[i]);
		}

		// set entry
		if (!file.contents) duo.entry(file.path);
		else duo.entry(file.contents.toString(), file.path.substr(file.path.lastIndexOf('.') + 1));

		duo.run(function(err, result) {
			if (err) return done(err);
			file.contents = new Buffer(result.code);
			done(null, file);
		});
	});
}