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
var bootlint  = require('gulp-bootlint');

//Lint Task
gulp.task('lint', function () {
  return gulp.src('client/app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Bootlint Task
gulp.task('bootlint', function (){
  return gulp.src('client/app/index.html')
  .pipe(bootlint({
    stoponerror: true,
    stoponwarning: true,
    loglevel: 'debug'
    }))
  });

//CSS minify
gulp.task('minify-css', function () {
  return gulp.src('client/styles/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('client/dist'));
});

//Concatenate and Minify JS
gulp.task('scripts', function () {
  return gulp.src('client/app/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/dist'));
});

//run nodemon
gulp.task('server', function () {
  nodemons({
    script: 'server/server.js',
    ext: 'js html',
  })
});

//testing
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//Watch files
gulp.task('watch', function () {
  gulp.watch('js/*.js', ['lint', 'scripts'])
});

//default
gulp.task('default', ['lint', 'bootlint', 'minify-css', 'scripts', 'test', 'server', 'watch']);