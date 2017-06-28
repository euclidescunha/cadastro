const gulp 	       = require('gulp'),
	  sass         = require('gulp-sass'),
      cssbeautify  = require('gulp-cssbeautify'),
      autoprefixer = require('gulp-autoprefixer'),
      plumber      = require('gulp-plumber'),
      livereload   = require('gulp-livereload'),
      pngquant     = require('imagemin-pngquant'),
      imagemin     = require('gulp-imagemin'),
      opn          = require('opn'),
      webserver    = require('gulp-webserver'),
      sourcemaps   = require('gulp-sourcemaps');

const srcPath = {
  styles:  ['src/sass/**/*.sass'],
  images:  ['src/img/**/*.*'],
  htmls:   ['*.html']
};

const distPath = {
  styles:  'dist/css',
  images:  'dist/img'
};

const server = {
  host: 'localhost',
  port: '4242'
};

gulp.task('css', function() {
  gulp.src( srcPath.styles )
    .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe( cssbeautify({
      indent: '  ',
      autosemicolon: true
    }))
    .pipe( sourcemaps.write('/maps') )
    .pipe( plumber() )
    .pipe( gulp.dest( distPath.styles ))
    .pipe( livereload() );
});

gulp.task('image', function() {
  gulp.src( srcPath.images )
    .pipe( imagemin({
      progressive: true,
      use: [ pngquant() ]
    }))
    .pipe( gulp.dest( distPath.images ))
    .pipe( livereload() );
});

gulp.task('html', function() {
	gulp.src( srcPath.htmls )
		.pipe( livereload() );
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch( srcPath.styles,  ['css'] );
  gulp.watch( srcPath.images, ['image'] );
	gulp.watch( srcPath.htmls,  ['html'] );
});

gulp.task('webserver', function() {
	gulp.src('.')
		.pipe( webserver({
			host: server.host,
			port: server.port,
			livereload: true,
			directoryListining: false
		}));
});

gulp.task('openbrowser', function() {
	opn('http://localhost:4242');
});

gulp.task('build', ['css', 'image'])

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);