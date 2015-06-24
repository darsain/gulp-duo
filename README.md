# gulp-duo

Duo plugin for gulp.

- Initiates Duo with `new Duo(file.cwd)`.
- Will use `file.contents` when present.
- Will build from path when `gulp.src('foo.js', { read: false })`.

## Example

```js
var duo = require('gulp-duo');

// all default options
var options = {
	development: false,
	sourceMap: false,
	cache: true,
	copy: false,
	standalone: null,
	global: null,
	concurrency: 50,
	installTo: './components',
	buildTo: './build',
	token: null,
	plugins: []
};

gulp.src('index.js', { read: false })
	.pipe(duo(options))
	.pipe(gulp.dest('build'));
```

Use config function instead of options object:

```js
var duo = require('gulp-duo');

function config(duo) {
	duo.development(true);
}

gulp.src('index.js', { read: false })
	.pipe(duo(config))
	.pipe(gulp.dest('build'));
```

## Options

See all available options in [Duo API documentation](https://github.com/duojs/duo/blob/master/docs/api.md).

Properties are mapped to methods with simple `duo[key](value)` call.

`plugins` array items are each passed to `duo.use(plugin)`.