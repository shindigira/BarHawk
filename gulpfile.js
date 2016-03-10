//include gulp
var gulp = require('gulp');

//plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

//Lint Task
gulp.task('lint', function() {
  return gulp.src('client/app/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

//Sass
gulp.task('minify-css', function() {
  return gulp.src('client/styles/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

//Concatenate and Minify JS
gulp.task('scripts', function() {
  return gulp.src('client/app/**/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist'))
  .pipe(rename('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

//Watch files
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['lint', 'scripts'])
});

//default
gulp.task('default', ['lint', 'minify-css', 'scripts', 'watch']);