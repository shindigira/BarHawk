//include gulp
var gulp = require('gulp');
//server for testing
var Server = require('karma').Server;

//plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var minify = require('gulp-minify');
var nodemons = require('gulp-nodemon');
var bootlint = require('gulp-bootlint');

//Lint Task
gulp.task('lint', function (cb) {
  return gulp.src('client/app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    cb(err);
});

//Bootlint Task
gulp.task('bootlint', ['lint'], function (cb){
  return gulp.src('client/app/index.html')
  .pipe(bootlint({
    stoponerror: true,
    stoponwarning: true,
    loglevel: 'debug'
    }));
  cb(err)
  });


//CSS minify
gulp.task('minify-css', ['bootlint'], function (cb) {
  return gulp.src('client/styles/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('client/dist'));
    cb(err);
});

//Concatenate and Minify JS
gulp.task('scripts', ['minify-css'], function (cb) {
  return gulp.src('client/app/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/dist'));
    cb(err);
});

//testing
gulp.task('test', ['scripts'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//run nodemon
gulp.task('server', ['test'], function () {
  nodemons({
    script: 'server/server.js',
    ext: 'js html',
  });
});

//Watch files
gulp.task('watch', ['server'], function () {
  gulp.watch('js/*.js', ['lint', 'scripts']);
});

//default
gulp.task('default', ['lint', 'bootlint', 'minify-css', 'scripts', 'test', 'server', 'watch']);
