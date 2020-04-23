var gulp = require('gulp'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require("gulp-minify");

// Task HTML
gulp.task('html', function () {
  return gulp.src('stage/html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
});

// Task CSS
gulp.task('css', function () {
  return gulp.src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
});

// JS Task
gulp.task('js', function () {
  return gulp.src("stage/js/*.js")
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
});

// Watch Task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", ['html']);
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], ['css']);
  gulp.watch("stage/js/*.js", ['js']);
});